import { useContext, useEffect, useState } from 'react';
import { getUsersApi } from 'api/user/get';
import {
  getChannelApi,
  getNationApi,
  getPreRsrvApi,
  getPreRsrvUserApi,
} from 'api/reservation/get';
import { AuthContext } from 'context/auth';
import { useSelector } from 'react-redux';

const useFetch = (page, currentPage, perPage) => {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [totalPage, setTotalPage] = useState('');
  const store = useSelector((store) => {
    return store;
  });

  const fetchData = async (order_type, sort_type) => {
    setLoading(true);

    switch (page) {
      case 'userinfo':
        const payloadUser = {
          ...store.userFilter,
          page: currentPage,
          perPage: perPage,
          pagination: 'Y',
          order: order_type,
          sort: sort_type,
        };

        const { data } = await getUsersApi(payloadUser);
        try {
          setBuckets(data.data.data);
          setTotalPage(data.data.total);
        } catch ({ response }) {
          if (response.status === 401) {
            logout();
          }
        }

        // .then(({ data }) => {
        //   if (data.success) {
        //     setBuckets(data.data.data);
        //     setTotalPage(data.data.total);
        //   }
        // })
        // .catch(({ response }) => {
        //   if (response.status === 401) {
        //     logout();
        //   }
        // });
        break;

      case 'preuser':
        const payloadPreUser = {
          ...store.preUserFilter,
          page: currentPage,
          perPage: perPage,
          order: order_type,
          orderBy: sort_type,
        };

        getPreRsrvUserApi(payloadPreUser)
          .then(({ data }) => {
            setBuckets(data.data);
            setTotalPage(data.total);
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              logout();
            }
          });
        break;

      case 'rankuser':
        const payloadRankUser = {
          ...store.rankUserFilter,
          page: currentPage,
          perPage: perPage,
          order: order_type,
          orderBy: sort_type,
        };

        getPreRsrvUserApi(payloadRankUser)
          .then(({ data }) => {
            setBuckets(data.data);
            setTotalPage(data.total);
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              logout();
            }
          });
        break;

      case 'rsrvstatus':
        const payloadResvStatus = {
          ...store.preReservFilter,
        };
        getPreRsrvApi(payloadResvStatus)
          .then(({ data }) => {
            setBuckets(data);
            setTotalPage(data.ratio);
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              logout();
            }
          });
        break;

      case 'channel':
        getChannelApi()
          .then(({ data }) => {
            if (data.success) {
              setBuckets(data.list);
            }
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              logout();
            }
          });
        break;

      case 'nation':
        getNationApi()
          .then(({ data }) => {
            if (data.success) {
              setBuckets(data.list);
            }
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              logout();
            }
          });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  return [buckets, totalPage, fetchData, loading, setLoading];
};

export default useFetch;
