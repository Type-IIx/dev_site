import Head from "next/head";
import Link from "next/link";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import {axiosInstance} from "../../utils/apiHandler"
import { toast } from "react-toastify";


export default function BlogList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchArticles = async () => {
      setLoading(true);
      const url = BASE_URL + "blog/blogs";
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = await res.data;
        setArticles(data);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchArticles();
    }, []);


    const deletePost = async (id) => {
        const url = BASE_URL + `blog/delete/${id}`
        const res = await axiosInstance.delete(url);
        if (res.status === 200) {
            toast.success("Deleted post")
            fetchBooks();
        }else{
            toast.error("Failed Deleting post")
        }
    }


  return (
    <>
      <Head>
        <title>Book List</title>
      </Head>
 <AdminWrapper>
        <AdminChecker>
            
    {
        !loading && <>
        
        <section className="price-page-section">
        <div className="auto-container">
          <div className="row clearfix my-3">
            <div class="col-md-6">
              <div className="sec-title-two">
                <div className="title color-three">List of Posts</div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="float-right">
                <Link className="theme-btn btn-style-two" href="/admpanel/addblog">
                  <span className="txt">Add New Post</span>
                </Link>
              </div>
            </div>

            <table className="table">
              <tbody>
              {
            articles.map((e,i) => {
                return <tr key={`admin-book-${i}`}>
                <th scope="row">1</th>
                <td>
                  <h4>{e.title}</h4>
                  <Link href={`/admpanel/editblog/${e.id}`} className="btn btn-sm btn-dark text-white m-2">Edit</Link>
                  <a onClick={() => {deletePost(e.id)}} className="btn btn-sm btn-danger text-white">Delete</a>
                </td>
              </tr>
            })
        }
                
                
              </tbody>
            </table>
          </div>
        </div>
      </section>
        
        
        </>
        
    }        
     
        </AdminChecker>
        </AdminWrapper>
      

    </>
  );
}
