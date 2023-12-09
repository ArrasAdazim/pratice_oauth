import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

interface TweetEntity {
  id: number;
  content: string;
  user: UserEntity;
}

const tweets_api_base_url = "http://localhost:8082";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(tweets_api_base_url + "/api/tweets");
      const responseJSON = await response.json();

      setTweets(responseJSON.data.tweets);
    };

    const fetchUsers = async () => {
      const response = await fetch(tweets_api_base_url + "/api/users");
      const responseJSON = await response.json();
      console.log("users", responseJSON);

      setUsers(responseJSON.data.users);
    };
    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    fetchTweets();
    fetchUsers();
    checkIsLoggedIn();
  }, []);

  const logoutHandler = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin?");
    if (isConfirmed) {
      localStorage.removeItem("access_token");

      setIsLoggedIn(false);
      alert("Logout Berhasil");
    } else {
      alert("Logout dibatalkan");
    }
  };

  return (
    <div className="flex w-full place-content-center min-h-screen">
      <div className=" p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">Home</h1>
          {isLoggedIn ? (
            <button
              className="py-2 px-3 bg-black text-white rounded-lg"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="py-2 px-3 bg-black text-white rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="mt-[30px]">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">List Tweet</h1>
            {isLoggedIn && (
              <Link to="/create-tweet">
                <button className="py-2 px-3  text-white rounded-lg">
                  <PlusCircleIcon className="w-8 h-8 text-black" />
                </button>
              </Link>
            )}
          </div>
          {/* <div className="mt-[10px]">
            {!tweets.length && <div>Data kosong</div>}

            {tweets &&
              tweets.map((tweet: TweetEntity) => (
                <div key={tweet.id} className="mt-3">
                  <h3>{tweet.content}</h3>
                  <p>
                    Dibuat oleh <strong>{tweet.user.name}</strong>
                  </p>
                </div>
              ))}
          </div> */}

          <table className="border-collapse mt-10 w-full  ">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-300 border-gray-300 ">
                  Tweet
                </th>
                <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                  Dibuat oleh
                </th>
              </tr>
            </thead>
            <tbody>
              {!tweets.length ? (
                <tr>
                  <td className="border px-4 py-2" colSpan={2}>
                    Data kosong
                  </td>
                </tr>
              ) : (
                tweets.map((tweet: TweetEntity) => (
                  <tr key={tweet.id}>
                    <td className="border px-4 py-2 border-gray-300">
                      {tweet.content}
                    </td>
                    <td className="border px-4 py-2 border-gray-300">
                      Dibuat oleh <strong>{tweet.user.name}</strong>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">List Users</h1>
            <Link to="/create-user">
              <button className="py-2 px-3  text-white rounded-lg">
                <PlusCircleIcon className="w-8 h-8 text-black" />
              </button>
            </Link>
          </div>

          <table className="border-collapse mt-10 w-full  ">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-300 border-gray-300 ">
                  Nama
                </th>
                <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                  Email
                </th>
                <th className="border px-4 py-2 bg-gray-300 border-gray-300">
                  Foto
                </th>
              </tr>
            </thead>
            <tbody>
              {!users.length ? (
                <tr>
                  <td className="border px-4 py-2" colSpan={3}>
                    Data kosong
                  </td>
                </tr>
              ) : (
                users.map((user: UserEntity) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2 border-gray-300">
                      {user.name}
                    </td>
                    <td className="border px-4 py-2 border-gray-300">
                      {user.email}
                    </td>
                    {/* <td className="border px-4 py-2 border-gray-300">
                      {user.profile_picture_url}
                    </td> */}
                    <img
                      src={user.profile_picture_url}
                      alt={`Profile ${user.name}`}
                      className=" object-cover rounded-full"
                    />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
