import React, { useState, useEffect } from "react";
import axios from "axios";
import { LOCALHOST } from "../utils/System";

interface GithubType {
  id: number;
  login: any;
}
interface GithubUser {
  id: number;
  login: any;
  avatar_url: any;
  followers: any;
  public_repos: any;
}
export default function Login() {
  const [accessCode, setAccessCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [githubUsers, setGithubUsers] = useState([]);
  const [selectedGithubUser, setSelectedGithubUser] =
    useState<GithubUser | null>(null);
  const [favoriteGithubUsers, setFavoriteGithubUsers] = useState([]);

  useEffect(() => {
    getFavoriteGithubUsers();
  }, []);

  const createNewAccessCode = async () => {
    const response = await axios.post(`${LOCALHOST}/createNewAccessCode`, {
      phoneNumber,
    });
    setAccessCode(response.data);
  };

  const validateAccessCode = async () => {
    await axios.post(`${LOCALHOST}/validateAccessCode`, {
      accessCode,
      phoneNumber,
    });
  };

  const searchGithubUsers = async (searchTerm: any, page = 1, perPage = 10) => {
    const response = await axios.get(`${LOCALHOST}/searchGithubUsers`, {
      params: {
        q: searchTerm,
        page,
        per_page: perPage,
      },
    });
    setGithubUsers(response.data.items);
  };

  const findGithubUserProfile = async (githubUserId: any) => {
    const response = await axios.get(
      `${LOCALHOST}/findGithubUserProfile/${githubUserId}`
    );
    setSelectedGithubUser(response.data);
  };

  const likeGithubUser = async (githubUserId: any) => {
    await axios.post(`${LOCALHOST}/likeGithubUser`, {
      phone_number: phoneNumber,
      github_user_id: githubUserId,
    });
    getFavoriteGithubUsers();
  };

  const getFavoriteGithubUsers = async () => {
    const response = await axios.get(`${LOCALHOST}/getUserProfile`, {
      params: {
        phone_number: phoneNumber,
      },
    });
    setFavoriteGithubUsers(response.data.favorite_github_users);
  };

  return (
    <div>
      <div>
        <label htmlFor="phoneNumber">Enter your phone number: </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="accessCode"></label>
        <button onClick={createNewAccessCode}>Get Access Code</button>
        <input
          type="text"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button onClick={validateAccessCode}>Validate Access Code</button>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => searchGithubUsers(e.target.value)}
        />
        <ul>
          {githubUsers.map((user: GithubType) => (
            <li key={user.id} onClick={() => findGithubUserProfile(user.id)}>
              {user.login}
            </li>
          ))}
        </ul>
      </div>
      {selectedGithubUser && (
        <div>
          <div>
            <h3>{selectedGithubUser.login}</h3>
            <img
              src={selectedGithubUser.avatar_url}
              alt={selectedGithubUser.login}
            />
            <p>Followers: {selectedGithubUser.followers}</p>
            <p>Public Repos: {selectedGithubUser.public_repos}</p>
            <button onClick={() => likeGithubUser(selectedGithubUser.id)}>
              Like
            </button>
          </div>
        </div>
      )}
      <div>
        <h3>Favorite Github Users:</h3>
        <ul>
          {favoriteGithubUsers.map((user: GithubType) => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
