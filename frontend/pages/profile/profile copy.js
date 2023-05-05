import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';


const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user-profile');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    user,
    user_profile,
    gender,
    purpose,
    occupation,
    annualIncome,
    area,
    prefecture,
    city,
  } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // フォームデータを更新する処理を実装してください
  };

  return (
    <Box>
      <Typography variant="h4">プロフィール</Typography>
      <form onSubmit={handleSubmit}>
        {/* ユーザー情報 */}
        <TextField label="ユーザー名" value={user.username} disabled />

        {/* プロフィール情報 */}
        <FormControl>
          <InputLabel>性別</InputLabel>
          <Select value={user_profile.gender} /* onChange処理を実装してください */>
            {gender.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* その他の選択肢データを表示するためのフォームコントロールを追加してください */}

        <Button type="submit" variant="contained" color="primary">
          更新
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
