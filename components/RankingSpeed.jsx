import React from "react";
import { useState, useEffect } from "react";

import Link from "next/link";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";

import { LOCAL_STORAGE_KEY_SPEED } from "../constant/config_speed";

const RankingSpeed = () => {
  const [recordsSpeed, setRecordsSpeed] = useState([]);
  const [recordsSpeedAll, setRecordsSpeedAll] = useState([]);

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
  }, []);

  return (
    <div className="mt-4 border-t-2 py-2">
      <h2 className="mt-4 mb-2">スピード (個人)</h2>
      <div className="flex items-center mb-1 text-sm">
        <span className="font-bold text-lg  mr-5  w-6 h-6 mb-2"></span>
        <span className="w-10 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          記録
        </span>
        <span className="w-14 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          文字数
        </span>
        <span className="w-20 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          日付
        </span>
        <span className="w-24 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          出発駅
        </span>
        <span className="w-24 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          終着駅
        </span>
      </div>
      {recordsSpeed
        .sort((a, b) => {
          if (a.count === b.count) {
            return b.letter - a.letter;
          }
          return b.count - a.count;
        })
        .map((record, index) => (
          <div className="flex items-center mb-3 text-sm" key={index}>
            <span className="font-bold text-md mr-5 border-2 border-black w-6 h-6 text-center">
              {index + 1}
            </span>
            <span className="w-10 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
              {record.count} 駅
            </span>
            <span className="w-14 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
              {record.letter} 文字
            </span>
            <span className="w-20 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
              {record.date}
            </span>
            <span className="whitespace-nowrap w-24 mr-2 text-right overflow-x-scroll hidden-scrollbar">
              {record.start}
            </span>
            <span className="whitespace-nowrap w-24 text-right overflow-x-scroll hidden-scrollbar">
              {record.end}
            </span>
          </div>
        ))
        .slice(0, 5)}
      <h2 className="mt-10 mb-2">スピード (総合)</h2>
      {!currentUser ? (
        <p className="">
          総合ランキングに参加するためには<Link href="/signin">ログイン</Link>
          してください
        </p>
      ) : (
        <></>
      )}
      <div className="flex items-center mb-1 text-sm">
        <span className="font-bold text-lg  mr-5  w-6 h-6 "></span>
        <span className="w-20 mr-2 text-right whitespace-nowrap  font-bold">
          プレイヤー
        </span>
        <span className="w-10 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          記録
        </span>
        <span className="w-14 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          文字数
        </span>
        <span className="w-20 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          日付
        </span>
        <span className="w-24 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          出発駅
        </span>
        <span className="w-24 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
          終着駅
        </span>
      </div>
      {recordsSpeedAll.map((record, index) => (
        <div className="flex items-center mb-3 text-sm" key={index}>
          <span className="font-bold text-md mr-5 border-2 border-black w-6 h-6 text-center">
            {index + 1}
          </span>
          <span className="w-20 mr-2 text-right whitespace-nowrap  font-bold overflow-x-scroll hidden-scrollbar">
            {record.name}
          </span>
          <span className="w-10 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
            {record.count} 駅
          </span>
          <span className="w-14 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
            {record.time} 文字
          </span>
          <span className="w-20 mr-2 whitespace-nowrap  text-right overflow-x-scroll hidden-scrollbar">
            {record.date}
          </span>
          <span className="whitespace-nowrap w-24 mr-2 text-right overflow-x-scroll hidden-scrollbar">
            {record.start}
          </span>
          <span className="whitespace-nowrap w-24 text-right overflow-x-scroll hidden-scrollbar">
            {record.end}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RankingSpeed;
