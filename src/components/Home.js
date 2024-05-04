import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { addNewJob, updateList } from "../redux/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [jobData, setJobData] = useState([]);
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [page, setPage] = useState(0);
  const JobsList = useSelector((state) => state.JobData.jobList);
  const filterData = useSelector((state) => state.JobData.filterData);
  const [filtersObject, setFiltersObject] = useState({
    minExp: null,
    compName: null,
    location: null,
    remote: null,
    stack: null,
    role: null,
    minPay: null,
  });
  async function getJobData() {
    const myHeaders = new Headers();
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
    const jobRes = res.jdList;
    let finalData = jobRes;
    if (isFilter) {
      if (filtersObject.location) {
        finalData = jobRes.filter((job) =>
          job?.location
            .toLowerCase()
            .includes(filtersObject.location.toLowerCase())
        );
      }
      if (filtersObject.minExp) {
        finalData = finalData.filter(
          (job) => filtersObject.minExp <= job?.minExp
        );
      }
      if (filtersObject.compName) {
        finalData = finalData.filter((job) =>
          job?.companyName
            .toLowerCase()
            .includes(filtersObject.compName.toLowerCase())
        );
      }
      if (filtersObject.remote) {
        finalData = finalData.filter((job) =>
          filtersObject.remote === "remote"
            ? job?.location === "remote"
            : job?.location !== "remote"
        );
      }
      if (filtersObject.role) {
        finalData = finalData.filter((job) =>
          job?.jobRole.toLowerCase().includes(filtersObject.role.toLowerCase())
        );
      }
      if (filtersObject.minPay) {
        finalData = filterData.filter(
          (job) => filtersObject.minPay <= job?.minJdSalary
        );
      }
    }
    const obj = {
      jobs: finalData,
      totalCount: res.totalCount,
    };
    dispatch(addNewJob(obj));

    setPage((page) => page + 10);
  }
  function applyFilter() {
    let finalData = JobsList;
    if (filtersObject.location) {
      finalData = finalData.filter((job) =>
        job?.location
          .toLowerCase()
          .includes(filtersObject.location.toLowerCase())
      );
    }
    if (filtersObject.minExp) {
      finalData = finalData.filter(
        (job) => filtersObject.minExp <= job?.minExp
      );
    }
    if (filtersObject.compName) {
      finalData = finalData.filter((job) =>
        job?.companyName
          .toLowerCase()
          .includes(filtersObject.compName.toLowerCase())
      );
    }
    if (filtersObject.remote) {
      finalData = finalData.filter((job) =>
        filtersObject.remote === "remote"
          ? job?.location === "remote"
          : job?.location !== "remote"
      );
    }
    if (filtersObject.role) {
      finalData = finalData.filter((job) =>
        job?.jobRole.toLowerCase().includes(filtersObject.role.toLowerCase())
      );
    }
    if (filtersObject.minPay) {
      finalData = filterData.filter(
        (job) =>
          filtersObject.minPay <= job?.minJdSalary ||
          job?.maxJdSalary <= filtersObject.minPay
      );
    }
    dispatch(updateList(finalData));
  }
  useEffect(() => {
    applyFilter();
  }, [filtersObject]);
  useEffect(() => {
    if (isFilter) {
      setJobData(filterData);
    } else {
      setJobData(JobsList);
    }
  }, [JobsList, filterData, isFilter]);
  useEffect(() => {
    getJobData();
  }, []);
  const minExperience = [
    { value: "1", label: "1", key: "minExp" },
    { value: "2", label: "2", key: "minExp" },
    { value: "3", label: "3", key: "minExp" },
    { value: "4", label: "4", key: "minExp" },
    { value: "5", label: "5", key: "minExp" },
    { value: "6", label: "6", key: "minExp" },
    { value: "7", label: "7", key: "minExp" },
    { value: "8", label: "8", key: "minExp" },
    { value: "9", label: "9", key: "minExp" },
    { value: "10", label: "10", key: "minExp" },
  ];
  const minPayOptions = [
    { value: "10", label: "10L", key: "minPay" },
    { value: "20", label: "20L", key: "minPay" },
    { value: "30", label: "30L", key: "minPay" },
    { value: "40", label: "40L", key: "minPay" },
    { value: "50", label: "50L", key: "minPay" },
    { value: "60", label: "60L", key: "minPay" },
    { value: "70", label: "70L", key: "minPay" },
  ];
  const remoteOptions = [
    { value: "remote", label: "Remote", key: "remote" },
    { value: "office", label: "On-Site", key: "remote" },
  ];
  const rolesOptions = [
    { value: "backend", label: "Backend", key: "role" },
    { value: "frontend", label: "Frontend", key: "role" },
    { value: "fullstack", label: "FullStack", key: "role" },
    { value: "ios", label: "Ios", key: "role" },
    { value: "flutter", label: "Flutter", key: "role" },
    { value: "android", label: "Android", key: "role" },
    { value: "graphicdesigner", label: "Graphic Designer", key: "role" },
    { value: "designmanager", label: "Design Manager", key: "role" },
    { value: "productmanager", label: "Product Manager", key: "role" },
    { value: "legal", label: "Legal", key: "role" },
    { value: "hr", label: "HR", key: "role" },
    { value: "finance", label: "Finance", key: "role" },
  ];
  function expFilter(event) {
    setIsFilter(true);
    let exp = parseInt(event.value);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.key]: exp,
    }));
  }
  function payFilter(event) {
    setIsFilter(true);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.key]: parseInt(event.value),
    }));
  }
  function rolesFilter(event) {
    setIsFilter(true);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.key]: event.value,
    }));
  }
  function remoteFilter(event) {
    setIsFilter(true);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.key]: event.value,
    }));
  }
  function nameFilter(event) {
    setIsFilter(true);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.name]: event.value,
    }));
  }
  function locFilter(event) {
    setIsFilter(true);
    setFiltersObject((prevFilters) => ({
      ...prevFilters,
      [event.name]: event.value,
    }));
  }
  function resetFilters() {
    setIsFilter(false);
    setFiltersObject((prevFilters) => ({
      minExp: null,
      compName: null,
      location: null,
      remote: null,
      stack: null,
      role: null,
      minPay: null,
    }));
  }
  return (
    <div className="mainBox">
      <div className="filterMainBox">
        <div className="allfilters">
          <Select
            // value={selectedOption}
            name="minExp"
            onChange={(e) => expFilter(e)}
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
            name="compName"
            onChange={(e) => nameFilter(e.target)}
            placeholder="Company Name"
          ></input>
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
            name="location"
            onChange={(e) => locFilter(e.target)}
            placeholder="Location"
          ></input>
          <Select
            // value={selectedOption}
            name="remote"
            onChange={(e) => remoteFilter(e)}
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
            // value={selectedOption}
            name="roles"
            onChange={(e) => rolesFilter(e)}
            placeholder="Roles"
            id="filterbox"
            options={rolesOptions}
          />
          <Select
            // value={selectedOption}
            name="minPay"
            onChange={(e) => payFilter(e)}
            placeholder="Min Base Pay"
            options={minPayOptions}
          />
        </div>
      </div>
      <br></br>
      <div>
        <button className="resetbtn" onClick={() => resetFilters()}>
          Reset Filters
        </button>
      </div>
      <br></br>
      <div className="jobCardsBox">
        <InfiniteScroll
          dataLength={jobData.length}
          next={getJobData}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          hasMore={true}
          loader={<h2 style={{ textAlign: "center" }}>Loading...</h2>}
          scrollableTarget="jobCardsBox"
        >
          {jobData.map((data) => {
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
