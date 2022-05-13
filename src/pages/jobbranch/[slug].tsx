import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootStore, IParams } from "../../utils/TypeScript";

import { getBlogsByBranch } from "../../redux/actions/blogAction";
import Loading from "../../components/alert/Loading";
import moment from "moment";


const JobBranch = () => {
    const { AllFrequency_report, barnchBlog} = useSelector((state: RootStore) => state)
    const dispacth = useDispatch()
    const {slug} = useParams<IParams>()

    const [jobbranchId, setJobbranchId] = useState('')

    useEffect(() => {
        const Frequency = AllFrequency_report.find(item => item._id === slug)
        if(Frequency) setJobbranchId(Frequency._id)
    },[slug, AllFrequency_report])

    useEffect(() => {
        if(!jobbranchId) return;

        dispacth(getBlogsByBranch(jobbranchId))

    },[jobbranchId])

    if(!barnchBlog) return <Loading />

    return (
        <div className="blogs_category">
            <div className="show_blogs">
                {
                    barnchBlog.map(barnchBlog => (
                        <div className="card" key={barnchBlog._id}>
                            {
                                 barnchBlog.wait_success === 'wait' &&
                                <h6 style={{fontSize:'18px', color: 'red'}}>กำลังรอดำเนินการ</h6>
                            }

                            {
                                 barnchBlog.wait_success === 'success' &&
                                <h6 style={{fontSize:'18px', color: 'green'}}>ดำเนินการเสร็จเรียบร้อย</h6>
                            }

                            {
                                 typeof(barnchBlog.thumbnail) === 'string' &&
                                 <img src={barnchBlog.thumbnail} className="card-img-top" alt="..."
                                 style={{height: '180px', objectFit: 'cover'}} />
                             }

                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/blog/${barnchBlog._id}`} style={{
                                        textDecoration: 'none', textTransform: 'capitalize'
                                    }}>
                                        {barnchBlog.title.slice(0,50) + '...'}
                                    </Link>
                                </h5>

                                <p className="card-text">
                                 { barnchBlog.description.slice(0,100) + '...' }
                                </p>

                                <p className="card-text d-flex justify-content-between">
                                    <small className="text-muted text-capitalize">
                                        {
                                        typeof(barnchBlog.user) === 'string' &&
                                        <Link to={`/profile/${barnchBlog.user}`} style={{
                                            textDecoration: 'none', textTransform: 'capitalize'
                                        }}>
                                            By: {barnchBlog.name}
                                        </Link>  
                                        } 
                                    </small>

                                    <small className="text-muted">
                                    { /*new Date(blog.createdAt).toLocaleString() */}
                                    {moment(barnchBlog.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                                </small>
                                </p>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
      )

}

export default JobBranch