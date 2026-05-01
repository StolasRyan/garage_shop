import styles from '../css/page.module.css'
const ArticleContent = ({html}:{html:string}) => {
  return (
    <div className={styles.content} dangerouslySetInnerHTML={{__html:html}}/>
  )
}

export default ArticleContent