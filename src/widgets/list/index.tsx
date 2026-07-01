import {useCustomQuery} from "@shared/hooks";
import {getTestPostsQueryOptions} from "@shared/options";
import {useState} from "react";
import styles from './styles.module.css';
import {useInvalidate} from "@shared/hooks/use-invalidate";

export const List = () => {
    const [testVariable, setTestVariable] = useState('da');
    const {data} = useCustomQuery(getTestPostsQueryOptions(testVariable));
    // const {data: dataTwo} = useCustomQuery(getTestPostsQueryOptions(testVariable));
    // const {data} = useCustomQuery(getPostsQueryOptions());

    const invalidate = useInvalidate();

    return (
        <div className={styles.list}>
            <button onClick={() => {
                setTestVariable('net')
            }}>Изменить ключ
            </button>
            <button onClick={() => invalidate('posts')}>
                Инвалидировать все posts
            </button>
            <button onClick={() => invalidate(`posts-${testVariable}`)}>
                Инвалидировать только текущий
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