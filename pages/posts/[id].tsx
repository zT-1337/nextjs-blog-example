import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostsId, getPostData, PostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({params}: {params: {id: string}}) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostsId();
  return {
    paths,
    fallback: false,
  }
}

export default function Post({postData}: {postData: PostData}) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date.toString()} />
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
    </Layout>
  )
}