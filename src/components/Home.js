import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
// import { decrement, increment } from './counterSlice'
import { increment, incrementByAmount,updateList } from "../redux/counterSlice";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { UseDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const ar = [1, 2, 3, 4, 5, 6];
  const [jobData, setJobData] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  async function getJobData() {
    const myHeaders = new Headers();
    console.log("Inside the function ", page);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: page,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    const data = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const res = await data.json();
    const obj = {
      jobs: res.jdList,
      totalCount: res.totalCount,
    };
    dispatch(incrementByAmount(obj));
    setPage((page) => page + 10);
  }
 
  const JobsList = useSelector((state) => state.counter.jobList);
  console.log("Redux data", JobsList);
  useEffect(() => {
    console.log("call useEffect");
    getJobData();
  }, []);
  const minExperience = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];
  const minPayOptions = [
    { value: "10", label: "10L" },
    { value: "20", label: "20L" },
    { value: "30", label: "30L" },
    { value: "40", label: "40L" },
    { value: "50", label: "50L" },
    { value: "60", label: "60L" },
    { value: "70", label: "70L" },
  ];
  const remoteOptions = [
    { value: "remote", label: "Remote" },
    { value: "office", label: "On-Site" },
  ];
  const rolesOptions = [
    { value: "backend", label: "Backend" },
    { value: "frontend", label: "Frontend" },
    { value: "fullstack", label: "FullStack" },
    { value: "ios", label: "Ios" },
    { value: "flutter", label: "Flutter" },
    { value: "android", label: "Android" },
    { value: "graphicdesigner", label: "Graphic Designer" },
    { value: "designmanager", label: "Design Manager" },
    { value: "productmanager", label: "Product Manager" },
    { value: "legal", label: "Legal" },
    { value: "hr", label: "HR" },
    { value: "finance", label: "Finance" },
  ];
  function expFilter(event){
    let exp = parseInt(event.value)
    const filteredData = JobsList.filter((job)=> exp<=job?.minExp )
    dispatch(updateList(filteredData))
  }
  function payFilter(event){
    let sal = parseInt(event.value)
    const filteredData = JobsList.filter((job)=> sal<=job?.minJdSalary || job?.maxJdSalary <=sal )
    dispatch(updateList(filteredData))
  }
  function rolesFilter(event){
    let exp = (event.value)
    const filteredData = JobsList.filter((job)=> job?.jobRole.toLowerCase().includes(exp.toLowerCase()) )
    dispatch(updateList(filteredData))
  }
  function remoteFilter(event){
    let exp = (event.value)
    const filteredData = JobsList.filter((job)=> exp === "remote" ? job?.location === "remote" : job?.location !== "remote" )
    dispatch(updateList(filteredData))
  }
  function nameFilter(event){
    const filteredData = JobsList.filter((job)=> job?.companyName.toLowerCase().includes(event.toLowerCase()))
    dispatch(updateList(filteredData))
  }
  function locFilter(event){
    const filteredData = JobsList.filter((job)=> job?.location.toLowerCase().includes(event.toLowerCase()))
    dispatch(updateList(filteredData))
  }
  const selectedOption = null;
  return (
    <div className="mainBox">
      <div className="filterMainBox">
        <div className="allfilters">
          <Select
            // value={selectedOption}
            onChange={(e)=>expFilter(e)}
            placeholder="Experience"
            options={minExperience}
          />
          <input
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              height: "34px",
              borderRadius: "4px",
              border: "1px solid rgb(204, 204, 204)",
              fontSize: "15px",
              color: "black",
            }}
            type="text"
            onChange={(e)=>nameFilter(e.target.value)}
            placeholder="Company Name"
          ></input>
          <input
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              height: "34px",
              borderRadius: "4px",
              border: "1px solid rgb(204, 204, 204)",
              fontSize: "15px",
              color: "rgb(204, 204, 204)",
            }}
            type="text"
            placeholder="Location"
          ></input>
          <Select
            value={selectedOption}
            onChange={(e)=>remoteFilter(e)}
            placeholder="Remote"
            options={remoteOptions}
          />
          <input
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              height: "34px",
              borderRadius: "4px",
              border: "1px solid rgb(204, 204, 204)",
              fontSize: "15px",
              color: "rgb(204, 204, 204)",
            }}
            type="text"
            placeholder="Tech Stack"
          ></input>
          <Select
            value={selectedOption}
            onChange={(e)=>rolesFilter(e)}            
            placeholder="Roles"
            id="filterbox"
            options={rolesOptions}
          />
          <Select
            // value={selectedOption}
            onChange={(e)=>payFilter(e)}
            placeholder="Min Base Pay"
            options={minPayOptions}
          />
        </div>
      </div>
      <br></br>
      <div className="jobCardsBox">
        <InfiniteScroll
          dataLength={JobsList.length}
          next={getJobData}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          hasMore={true}
          //   loader={<h4>Loading...</h4>}
          scrollableTarget="jobCardsBox"
        >
          {JobsList.map((data) => {
            return (
              <div className="jobCard">
                <div className="jobCard-freshness">
                  <p>⏳ Posted 2 days ago</p>
                </div>
                <br></br>
                <div className="jobCard-title">
                  <div>
                    <img width="40px" height="40px" src={data?.logoUrl}></img>
                  </div>
                  <div>
                    <h3>{data?.companyName}</h3>
                    <h2>{data?.jobRole}</h2>
                    <p>{data?.location}</p>
                  </div>
                </div>
                <div className="jobCard-salary">
                  <p>
                    Estimated Salary:{" "}
                    {data?.minJdSalary ? data?.minJdSalary : "0"} -{" "}
                    {data?.maxJdSalary} {data?.salaryCurrencyCode} ✅
                  </p>
                </div>
                <div className="jobCard-desc">
                  <div>
                    <p>About Comapany:</p>
                  </div>
                  <p>About us</p>
                  <p>{data?.jobDetailsFromCompany}</p>
                </div>
                <div className="viewJob">
                  <a>View job</a>
                </div>
                <div className="jobCard-experience">
                  <h3>Minimum Experience</h3>
                  <h2>{data?.minExp} years</h2>
                </div>
                <div className="jobCard-apply">
                  <button>⚡ Easy Apply</button>
                </div>
                <div className="jobCard-apply">
                  <button>
                    <img
                      style={{ borderRadius: "100%", filter: "blur(1px)" }}
                      width="20px"
                      height="20px"
                      src="https://media.licdn.com/dms/image/C5103AQHVt2mE6FxV8Q/profile-displayphoto-shrink_800_800/0/1534593555331?e=1717632000&v=beta&t=4it3udzASl4VF4xaqVNLIeuov1xNZK5binLTShSqA1s"
                    ></img>{" "}
                    <img
                      style={{ borderRadius: "100%", filter: "blur(1px)" }}
                      width="20px"
                      height="20px"
                      src="https://media.licdn.com/dms/image/D5603AQFiKbu5wScZCg/profile-displayphoto-shrink_800_800/0/1708409046301?e=1715212800&v=beta&t=qJMRpEXVwwsXywaQfD9X5uUBdfBDMG1JsmVLppE_AuQ"
                    ></img>
                    <span>Unlock referral asks</span>
                  </button>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
