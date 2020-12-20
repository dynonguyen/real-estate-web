import houseApi from 'apis/houseApi';
import postApi from 'apis/postApi';
import GlobalLoading from 'components/GlobalLoading';
import PostDetail from 'components/PostDetail';
import constants from 'constants/index';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState({ house: true, post: true });

  const [post, setPost] = useState(null);
  const [house, setHouse] = useState(null);

  // event: Lấy nhà theo id
  useEffect(() => {
    let isSubscribe = true;
    async function getHouse() {
      try {
        const house = await houseApi.getHouse(id);
        if (house) {
          if (isSubscribe) {
            setHouse(house.data);
            setIsLoading({ ...isLoading, house: false });
          }
        }
      } catch (error) {
        if (isSubscribe) {
          setIsNotFound(true);
        }
      }
    }
    getHouse();
    return () => {
      isSubscribe = false;
    };
  }, []);

  // event: Lấy bài đăng
  useEffect(() => {
    let isSubscribe = true;
    async function getPost() {
      try {
        const post = await postApi.getPost(id);
        if (post) {
          if (isSubscribe) {
            setPost(post.data);
            setIsLoading({ ...isLoading, post: false });
          }
        }
      } catch (error) {
        if (isSubscribe) {
          setIsNotFound(true);
        }
      }
    }
    getPost();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      {isLoading.house && isLoading.post && (
        <GlobalLoading content="Đang lấy thông tin ..." />
      )}
      {isNotFound && <Redirect to={constants.ROUTES.NOT_FOUND} />}
      {house && post ? <PostDetail post={post} house={house} /> : <></>}
    </>
  );
}

export default PostDetailPage;
