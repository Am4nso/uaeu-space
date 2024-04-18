import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import {formatBytes, getIconFromMIME} from "../../utils.tsx";
import {CourseFileAPI} from "../../typed/course.ts";
import styles from "../../styles/components/course/file.module.scss";

dayjs.extend(relativeTime);

export default function File (props: CourseFileAPI) {
    return (
        <div className={styles.file} onClick={() => {
            window.open("https://api.uaeu.space/course/file?id=" + props.id, "_blank");
        }}>
            <div className={styles.fileIcon}>
                {getIconFromMIME(props.type)}
            </div>
            <div className={styles.fileBody}>
                <h3 className={styles.fileName}>
                    <span style={{color: "#007fff"}}
                       rel="noreferrer nofollow"
                          title={props.name}>{props.name}</span>
                </h3>
                <p className={"file-size"}>{formatBytes(props.size)}</p>
                <time
                    dateTime={props.created_at.toString()}
                    title={dayjs(props.created_at).format("MMM D, YYYY h:mm A")}
                >{dayjs(props.created_at).fromNow()}</time>
            </div>
        </div>
    );
}
