import React from "react";
import { useState, useEffect } from "react";

import RankingRow from "../components/RankingRow";

import Link from "next/link";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/DbContext";
import { db } from "../lib/firebase";

import { LOCAL_STORAGE_KEY_ENDLESS } from "../constant/config_endless";

const RankingEndless = () => {
  const [recordsEndless, setRecordsEndless] = useState([]);
  const [recordsEndlessAll, setRecordsEndlessAll] = useState([]);
  const [topRecord, setTopRecord] = useState([]);

  const { currentUser } = useAuth();
  const { userData } = useDb();

  // get records from local storage and set to records state
  useEffect(() => {
    const recordsEndless = localStorage.getItem(LOCAL_STORAGE_KEY_ENDLESS);
    if (recordsEndless) {
      setRecordsEndless(JSON.parse(recordsEndless));
    } else {
      setRecordsEndless([]);
    }
  }, []);

  const getRecordsEndlessFromFirestore = async () => {
    const q = query(
      collection(db, "records_endless"),
      orderBy("count", "desc"),
      orderBy("time", "asc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const records = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data());
    });
    setRecordsEndlessAll(records);
  };
  // get records from firestore and set to records state
  useEffect(() => {
    getRecordsEndlessFromFirestore();
    getUsersTopRecordFromFirestore();
  }, []);

  const getUsersTopRecordFromFirestore = async () => {
    if (!currentUser) return;
    const q = query(
      collection(db, "records_endless"),
      where("uid", "==", currentUser.uid),
      orderBy("count", "desc"),
      orderBy("time", "asc"),
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
      <h2 className="mt-2 mb-2">エンドレス (総合)</h2>
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
          timeOrLetter="タイム"
          date="日付"
          start="出発駅"
          end="終着駅"
          isHeading={true}
        />
        {recordsEndlessAll.map((record, index) => (
          <RankingRow
            key={index}
            rank={index + 1}
            name={record.name}
            count={record.count}
            timeOrLetter={record.time}
            date={record.date}
            start={record.start}
            end={record.end}
            isHeading={false}
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
                timeOrLetter={record.time}
                date={record.date}
                start={record.start}
                end={record.end}
              />
            ))}
          </>
        )}
      </div>
      <h2 className="mt-10 mb-2">エンドレス (個人)</h2>
      <div className="overflow-x-scroll">
        <RankingRow
          rank=""
          name="プレイヤー"
          count="記録"
          timeOrLetter="タイム"
          date="日付"
          start="出発駅"
          end="終着駅"
          isHeading={true}
        />
        {recordsEndless
          .sort((a, b) => {
            if (a.count === b.count) {
              return a.time - b.time;
            }
            return b.count - a.count;
          })
          .map((record, index) => (
            <RankingRow
              key={index}
              rank={index + 1}
              name="あなた"
              count={record.count}
              timeOrLetter={record.time}
              date={record.date}
              start={record.start}
              end={record.end}
            />
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default RankingEndless;
