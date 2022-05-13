import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IParams, RootStore, IComment } from '../../utils/TypeScript'

import UserInfo from '../../components/profile/UserInfo'
import OtherInfo from '../../components/profile/OtherInfo'
import UserBlogs from '../../components/profile/UserBlogs'

const Profile = () => {
  const { slug }: IParams = useParams()
  const { auth, comments } = useSelector((state: RootStore) => state)

  const [showComments, setShowComments] = useState<IComment[]>([])


  useEffect(() => {
    setShowComments(comments.data)
  },[comments.data])

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {
          auth.user?._id === slug
          ? <UserInfo />
          : <OtherInfo id={slug} />
        }
      </div>

      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  )
}

export default Profile
