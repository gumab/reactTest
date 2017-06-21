import React from 'react';

const PostList = (props) => {
    return (
        <div>{props.match.params.postId} 번째 포스팅</div>
    );
}

export default PostList;