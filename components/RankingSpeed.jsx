import React from "react";
import { useState, useEffect } from "react";

import Link from "next/link";

import RankingRow from "../components/RankingRow";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";

import { LOCAL_STORAGE_KEY_SPEED } from "../constant/config_speed";

const RankingSpeed = () => {
  const [recordsSpeed, setRecordsSpeed] = useState([]);
  const [recordsSpeedAll, setRecordsSpeedAll] = useState([]);
  const [topRecord, setTopRecord] = useState([]);

  const { currentUser } = useAuth();

  // get records from local storage and set to records state
  useEffect(() => {
    const recordsSpeed = localStorage.getItem(LOCAL_STORAGE_KEY_SPEED);
    if (recordsSpeed) {
      setRecordsSpeed(JSON.parse(recordsSpeed));
    } else {
      setRecordsSpeed([]);
    }
  }, []);

  const getRecordsSpeedFromFirestore = async () => {
    const q = query(
      collection(db, "records_speed"),
      orderBy("count", "desc"),
      orderBy("letter", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const records = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data());
    });
    setRecordsSpeedAll(records);
  };
  // get records from firestore and set to records state
  useEffect(() => {
    getRecordsSpeedFromFirestore();
    getUsersTopRecordFromFirestore();
  }, []);

  const getUsersTopRecordFromFirestore = async () => {
    if (!currentUser) return;
    const q = query(
      collection(db, "records_speed"),
      where("uid", "==", currentUser.uid),
      orderBy("count", "desc"),
      orderBy("letter", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const records = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data());
    });
    setTopRecord(records);
  };

  return (
    <div className="mt-4 border-t-2 py-2">
      <h2 className="mt-2 mb-2">スピード (総合)</h2>
      {!currentUser && (
        <p className="">
          総合ランキングに参加するためには<Link href="/signin">ログイン</Link>
          してください
        </p>
      )}
      <div className="overflow-x-scroll">
        <RankingRow
          rank=""
          name="プレイヤー"
          count="記録"
          timeOrLetter="文字数"
          date="日付"
          start="出発駅"
          end="終着駅"
          isHeading={true}
        />
        {recordsSpeedAll.map((record, index) => (
          <RankingRow
            key={index}
            rank={index + 1}
            name={record.name}
            count={record.count}
            timeOrLetter={record.letter}
            date={record.date}
            start={record.start}
            end={record.end}
            isHeading={false}
            mode="speed"
          />
        ))}
        {currentUser && (
          <>
            <p className="font-bold mt-5 mb-0">あなたのベストスコア</p>
            {topRecord.map((record, index) => (
              <RankingRow
                key={index}
                rank=""
                name={record.name}
                count={record.count}
                timeOrLetter={record.letter}
                date={record.date}
                start={record.start}
                end={record.end}
                isHeading={false}
                mode="speed"
              />
            ))}
          </>
        )}
      </div>
      <h2 className="mt-10 mb-2">スピード (個人)</h2>
      <div className="overflow-x-scroll">
        <RankingRow
          rank=""
          name="プレイヤー"
          count="記録"
          timeOrLetter="文字数"
          date="日付"
          start="出発駅"
          end="終着駅"
          isHeading={true}
        />
        {recordsSpeed
          .sort((a, b) => {
            if (a.count === b.count) {
              return b.letter - a.letter;
            }
            return b.count - a.count;
          })
          .map((record, index) => (
            <RankingRow
              key={index}
              rank={index + 1}
              name="あなた"
              count={record.count}
              timeOrLetter={record.letter}
              date={record.date}
              start={record.start}
              end={record.end}
              isHeading={false}
            />
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default RankingSpeed;
