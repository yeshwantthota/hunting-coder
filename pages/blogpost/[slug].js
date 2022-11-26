import React, { useState, useEffect } from "react";

import styles from "../../styles/Blogpost.module.css";
import * as fs from "fs";
const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
  }
  const [blog, setBlog] = useState(props.myBlog);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />

        {blog && (
          <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        )}
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  let allb = await fs.promises.readdir(`blogdata`);
  allb = allb.map((item) => {
    return { params: { slug: item.split(".")[0] } };
  });
  return {
    paths: allb,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}

export default Slug;
