import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../actions/profile';

const Profile = () => {
  const dispatch = useDispatch();

  const {
    user_profile,
    gender,
    purpose,
    hobby,
    occupation,
    annualIncome,
    area,
    prefecture,
    city,
  } = useSelector((state) => state.profile);

  const [username, setUsername] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [birthday, setBirthday] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedAnnualIncome, setSelectedAnnualIncome] = useState(null);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [introduction, setIntroduction] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPrefectureId, setSelectedPrefectureId] = useState(null);



  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user_profile) {
      setUsername(user_profile.username);
      setSelectedGender(user_profile.gender.id);
      setBirthday(user_profile.birthday);
      setSelectedOccupation(user_profile.occupation.id);
      setSelectedAnnualIncome(user_profile.annual_income.id);
      setSelectedPurposes(user_profile.purpose.map(p => p.id));
      setSelectedHobbies(user_profile.hobbies.map(h => h.id)); // <-- ここを修正
      setIntroduction(user_profile.introduction);
    }
  }, [user_profile]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(parseInt(e.target.value));
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setSelectedOccupation(parseInt(e.target.value));
  };

  const handleAnnualIncomeChange = (e) => {
    setSelectedAnnualIncome(parseInt(e.target.value));
  };

  const handlePurposeChange = (e) => {
    const value = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPurposes([...selectedPurposes, value]);
    } else {
      setSelectedPurposes(selectedPurposes.filter(id => id !== value));
    }
  };

  const handleAreaChange = (e) => {
    setSelectedArea(parseInt(e.target.value));
  };

  const handlePrefectureChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedPrefectureId(selectedId);
  };

  
  const filteredPrefectures = prefecture.filter(
    (pref) => !selectedArea || pref.area.id === parseInt(selectedArea)
  );
  
  const filteredCities = city.filter(
    (cityItem) => cityItem.prefecture.id === selectedPrefectureId
  );
  
  const handleHobbyChange = (e) => {
    const value = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter(id => id !== value));
    }
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };


  return (
    <div>
      {/* データを表示するコード */}
      <h1>プロフィール</h1>
      {user_profile && (
        <div>
          <p>ユーザー名: {user_profile.username}</p>
          <p>性別: {user_profile.gender.name}</p>
          <p>誕生日: {user_profile.birthday}</p>
          <p>年収: {user_profile.annual_income.name}</p>
          <p>職業: {user_profile.occupation.name}</p>
          <p>目的: {user_profile.purpose.map(p => p.name).join(', ')}</p>
          <p>趣味: {user_profile.hobbies.map(p => p.name).join(', ')}</p>
          <p>自己紹介: {user_profile.introduction}</p>
          <p>居住エリア: {user_profile.residence_prefecture.area.name}</p>
          <p>居住都道府県: {user_profile.residence_prefecture.name}</p>
          <p>居住市町村: {user_profile.residence_citys.map(city => city.name).join(', ')}</p>
          <p>勤務エリア: {user_profile.workplace_prefecture.area.name}</p>
          <p>勤務都道府県: {user_profile.workplace_prefecture.name}</p>
          <p>居住市町村: {user_profile.workplace_citys.map(city => city.name).join(', ')}</p>
        </div>
      )}
      <h1>-------------プロフィール-------------</h1>

      <div className="auth-card mx-auto">
      <div className="text-center text-2xl mb-5">プロフィール編集</div>
      <form className="w-1/3 mx-auto">
        {user_profile && (
          <div>
            <div className="mb-4">
              <label className="mb-1" htmlFor="username">ユーザー名</label>
              <input
                className="input-form"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="mb-4">
              <label className="mb-1" htmlFor="gender">性別</label>
              <select
                className="input-form"
                id="gender"
                name="gender"
                value={selectedGender}
                onChange={handleGenderChange}
              >
                {gender.map((genderOption) => (
                  <option key={genderOption.id} value={genderOption.id}>
                    {genderOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1" htmlFor="birthday">誕生日</label>
              <input
                className="input-form"
                type="date"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </div>

            <div className="mb-4">
              <label className="mb-1" htmlFor="occupation">職業</label>
              <select
                className="input-form"
                id="occupation"
                name="occupation"
                value={selectedOccupation}
                onChange={handleOccupationChange}
              >
                {occupation.map((occupationOption) => (
                  <option key={occupationOption.id} value={occupationOption.id}>
                    {occupationOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1" htmlFor="annualIncome">年収</label>
              <select
                className="input-form"
                id="annualIncome"
                name="annualIncome"
                value={selectedAnnualIncome}
                onChange={handleAnnualIncomeChange}
              >
                {annualIncome.map((annualIncomeOption) => (
                  <option key={annualIncomeOption.id} value={annualIncomeOption.id}>
                    {annualIncomeOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <div className="mb-1">目的</div>
              {purpose.map((purposeOption) => (
                <div key={purposeOption.id}>
                  <input
                    type="checkbox"
                    id={`purpose-${purposeOption.id}`}
                    name={`purpose-${purposeOption.id}`}
                    value={purposeOption.id}
                    checked={selectedPurposes.includes(purposeOption.id)}
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor={`purpose-${purposeOption.id}`}>{purposeOption.name}</label>
                </div>
              ))}
            </div>

            <div>
              {/* Area selection */}
              <label htmlFor="area">Area:</label>
              <select id="area" value={selectedArea || ""} onChange={handleAreaChange}>
                <option value="">--Select Area--</option>
                {area.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* Prefecture selection */}
              <label htmlFor="prefecture">Prefecture:</label>
              <select id="prefecture">
                <option value="">--Select Prefecture--</option>
                {filteredPrefectures.map((pref) => (
                  <option key={pref.id} value={pref.id}>
                    {pref.name}
                  </option>
                ))}
              </select>
            </div>

            <select value={selectedPrefectureId} onChange={handlePrefectureChange}>
              <option value="">都道府県を選択してください</option>
              {filteredPrefectures.map((prefecture) => (
                <option key={prefecture.id} value={prefecture.id}>
                  {prefecture.name}
                </option>
              ))}
            </select>

            <div>
            {filteredCities.map((cityItem) => (
              <div key={cityItem.id}>
                <input
                  type="checkbox"
                  id={cityItem.id}
                  name={cityItem.name}
                  value={cityItem.id}
                />
                <label htmlFor={cityItem.id}>{cityItem.name}</label>
              </div>
            ))}
          </div>

            <div className="mb-4">
              <div className="mb-1" htmlFor="introduction">自己紹介</div>
              <textarea
                className="input-form"
                id="introduction"
                name="introduction"
                value={introduction}
                onChange={handleIntroductionChange}
                rows="4"
              />
            </div>
        
            <div className="flex justify-center">
              <button className="button-indigo" type="submit">更新</button>
            </div>
          </div>
        )}
      </form>
    </div>

    </div>
  );
};

export default Profile;


