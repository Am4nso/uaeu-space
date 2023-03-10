import {useCombobox} from "downshift";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DatalistContent, getFilter, SearchBoxProps} from "../utils/SearchBox";
import {useTranslation} from "react-i18next";
import {namespaces} from "../i18n";
import {getCoursesList, getProfessorsList} from "../api/api";
import Fuse from "fuse.js";
import {da} from "date-fns/locale";


const SearchBoxElement = (props: SearchBoxProps) => {

    const SearchBox = () => {

        const nav = useNavigate();
        const [items, setItems] = useState<DatalistContent[]>([]);
        const [allItems, setAllItems] = useState<DatalistContent[]>([]);
        const {t} = useTranslation(namespaces.pages.home);

        const {
            inputValue,
            getMenuProps,
            getInputProps,
            highlightedIndex,
            getItemProps,
        } = useCombobox({
            async onInputValueChange({inputValue}) {

                if (!inputValue) {
                    setItems([]);
                    return;
                }

                if (!allItems.length) {
                    setItems([{item: {name: "Loading...", tag: ""}}]);

                    const datalist: unknown = props.type === "course" ? await getCoursesList() : await getProfessorsList();

                    if (!datalist) return;

                    const newDatalist: DatalistContent[] = datalist as DatalistContent[];

                    let fuse;

                    if ('tag' in newDatalist[0]) {
                        fuse = new Fuse(newDatalist, {
                            threshold: 0.4,
                            ignoreLocation: true,
                            keys: ['tag', 'name']
                        })
                    } else{
                        fuse = new Fuse(newDatalist, {
                            threshold: 0.4,
                            ignoreLocation: true,
                            keys: ['name']
                        })
                    }

                    setAllItems(newDatalist);
                    setItems(fuse.search(inputValue, {limit: 5}) as unknown as DatalistContent[]);
                    return;
                }

                let fuse;

                if (props.type === "course") {
                    fuse = new Fuse(allItems, {
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: ['name', 'tag']
                    })
                } else {
                    fuse = new Fuse(allItems, {
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: ['name']
                    })
                }
                setItems((fuse.search(inputValue, {limit: 5}) as unknown as DatalistContent[]) || [""]);

            },
            items,
            itemToString(item) {
                return item ? item.item.name : "";
            },
            onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
                if (!newSelectedItem) return;
                if ('email' in newSelectedItem.item) {
                    nav(`/professor/${newSelectedItem.item.email}`);
                } else {
                    nav(`/course/${newSelectedItem.item.tag}`);

                }
            }
        })

        return (
            <div>

                <label className={"icon-label"}>
                    <input placeholder={t(`${props.type}_box.search_placeholder`)}
                           className={"search-bar"} {...getInputProps()}/>
                </label>

                <div className={"parent-datalist"}>
                    <ul className={"datalist"} {...getMenuProps()}>
                        {inputValue &&
                            items.map((element, index) => (
                                <li className={`datalist-option ${highlightedIndex === index && ' bg-blue-option'}`}
                                    key={`${element.item.name}${index}`} {...getItemProps({
                                    item: element.item as unknown as DatalistContent,
                                    index,
                                    disabled: element.item.name === "Loading..."
                                })}>

                                    <span>{'tag' in element.item && element.item.tag}</span>
                                    <span className={"course-name"}>{element.item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/*<p><Link className={"help-course"} to={'/report'}>{t(`${props.type}_box.not_found`)}</Link></p>*/}

            </div>
        )

    }

    return <SearchBox/>;
}

export default SearchBoxElement;