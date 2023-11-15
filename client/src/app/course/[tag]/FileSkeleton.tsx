import styles from "@/styles/components/File.module.scss";
import Skeleton from "react-loading-skeleton";


const FileSkeleton = () => {
    return (
        <div className={styles.file}>
            <div className={styles.fileIcon} style={{width: "50px", height: "50px"}}>
                <Skeleton height={50} width={50}/>
            </div>
            <div className={styles.fileBody}>
                <h3 className={styles.fileName} style={{width: "130px"}}>
                    <Skeleton/>
                </h3>
                <p className={"file-size"} style={{width: "50px"}}><Skeleton/></p>
                <div style={{width: "85px"}}><Skeleton/></div>
            </div>
        </div>
    )
}

export default FileSkeleton;