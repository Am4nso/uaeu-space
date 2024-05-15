import SearchBox from "../components/searchbox.tsx";
import styles from "../styles/pages/course.module.scss";

export default function CourseLookup() {
    return (
        <div className={styles.searchPage}>
            <h1>Course Materials</h1>
            <p>Share and find materials you need to help you succeed in your courses</p>

            <div className={styles.searchBox}>
                <SearchBox type={"course"}/>

            </div>
        </div>
    )
}