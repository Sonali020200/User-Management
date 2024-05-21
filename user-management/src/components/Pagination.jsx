import { useEffect, useState } from "react";
import {
  Pagination as AntdPagination,
  ConfigProvider,
  notification,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";


const UserPagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPage = { current: 1, limit: 10, total: 0 };

 
  const [pagination, setPagination] = useState(initialPage);
  

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    const searchSlow = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(searchSlow);
  }, [searchQuery, pagination.current, pagination.limit]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/search?q=${searchQuery}&skip=${
          (pagination.current - 1) * pagination.limit
        }&limit=${pagination.limit}`
      );

      if (!res.ok) {
        notification.error({
          placement: "bottomLeft",
          message: "Failed to fetch data",
          description: "ERROR 404",
        });
        // throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      const { users, total } = data;
      setUsers(users);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total,
      }));
      
    
    } catch (err) {
      console.error(err);
      
    }
  };

  const handlePageChange = (page, limit) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      limit,
    }));
    navigate(`?page=${page}`);
  };

  return (
    <ConfigProvider prefixCls="my-antd">
      <div className="pagination">
        <AntdPagination
          current={pagination.current}
          pageSize={pagination.limit}
          total={pagination.total}
          onChange={handlePageChange}
        />
      </div>
    </ConfigProvider>
  );
};

export default UserPagination;
