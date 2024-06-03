import { useState, useEffect } from 'react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
    const data = await response.json();
    setPosts(data.posts);
    setTotalPages(data.totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;