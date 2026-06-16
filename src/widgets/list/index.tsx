import {useCustomQuery} from "../../shared/hooks";
import {getPostsQueryOptions, getTestPostsQueryOptions} from "../../shared/options";
import {useState} from "react";
import styles from './styles.module.css';

export const List = () => {
    const [testVariable, setTestVariable] = useState('da');
    const {data} = useCustomQuery(getTestPostsQueryOptions(testVariable));
    const {data: dataTwo} = useCustomQuery(getTestPostsQueryOptions(testVariable));
    // const {data} = useCustomQuery(getPostsQueryOptions());
    console.log(data);

    return (
        <div className={styles.list}>
            <button onClick={() => {
                setTestVariable('net')
            }}>Изменить ключ
            </button>

            <ul>
                {data?.map((post) => (
                    <li key={post.id}>
                        <p>{post.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}