import React, { useEffect } from "react";
import {
  changeSearchValue,
  setDropdownValue,
  setDatepickerDate,
  sortOrFilrterTasks,
  toggleClick,
  resetSearchData,
} from "../../Redux/actions";
import { connect } from "react-redux";
import { Form, Button, DropdownButton, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Search.module.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const sortVariants = [
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Created_Date_Oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Created_Date_Newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion_Date_Oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion_Date_Newest",
    value: "completion_date_newest",
  },
  {
    label: "Reset",
    value: "",
  },
];

const statusVariants = [
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Reset",
    value: "",
  },
];

const Search = (props) => {
  const {
    search,
    sort,
    status,
    create_lte,
    create_gte,
    complete_lte,
    complete_gte,
    click,
  } = props.state;
  const {
    changeSearchValue,
    setDropdownValue,
    setDatepicker,
    sortOrFilrterTasks,
    toggleClick,
    state,
    resetSearchData,
  } = props;

  const datePickers = [
    {
      label: "Created Later",
      value: create_lte,
      name: "create_lte",
    },
    {
      label: "Created Greater",
      value: create_gte,
      name: "create_gte",
    },
    {
      label: "Completed Later",
      value: complete_lte,
      name: "complete_lte",
    },
    {
      label: "Completed Greator",
      value: complete_gte,
      name: "complete_gte",
    },
  ];
  useEffect(() => {
    return function () {
      resetSearchData();
    };
  }, []);

  const sortItems = sortVariants.map((item, idx) => (
    <DropdownItem
      key={idx}
      onClick={() => setDropdownValue("sort", item.value)}
    >
      {item.label}
    </DropdownItem>
  ));

  const statusItems = statusVariants.map((item, idx) => (
    <DropdownItem
      key={idx}
      onClick={() => setDropdownValue("status", item.value)}
    >
      {item.label}
    </DropdownItem>
  ));
  const datePickersJSX = datePickers.map((item, idx) => (
    <Form.Group key={idx} className="my-0 text-info">
      {item.label}
      <DatePicker
        selected={item.value}
        onChange={(date) => setDatepicker(item.name, date)}
        isClearable
        showMonthDropdown
        scrollableYearDropdown
      />
    </Form.Group>
  ));

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row className="d-flex justify-content-center mb-0">
          <Form.Group className={styles.search_box}>
            <Form.Control
              type="text"
              placeholder="Type to search"
              onChange={(e) => changeSearchValue(e.target)}
              value={search}
              name="search"
              className={styles.search_input}
              autoComplete="off"
            />
            <Button className={styles.search_btn} type="button">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form.Group>
        </Row>
        <Row className="d-flex-column">
          <Col className="d-flex justify-content-center ">
            <Form.Group className=" mr-1 ml-auto">
              <DropdownButton
                title={
                  status
                    ? statusVariants.find((el) => status === el.value).label
                    : "Status"
                }
                variant="info"
              >
                {statusItems}
              </DropdownButton>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <DropdownButton
                title={
                  sort
                    ? sortVariants.find((el) => sort === el.value).label
                    : "Sort"
                }
                variant="info"
              >
                {sortItems}
              </DropdownButton>
            </Form.Group>
          </Col>
          <Col className="justify-content-center align-items-start ">
            {!click ? (
              <Button variant="info" onClick={() => toggleClick(true)}>
                Date
              </Button>
            ) : (
              datePickersJSX
            )}
          </Col>
        </Row>
        <Row>
          <Button
            variant="primary"
            type="submit"
            className="mt-3 mx-auto"
            onClick={() => sortOrFilrterTasks(state)}
          >
            Sort tasks
          </Button>
        </Row>
      </Form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.searchReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchValue: (target) => dispatch(changeSearchValue(target)),
    toggleClick: (val) => dispatch(toggleClick(val)),
    setDropdownValue: (name, value) => dispatch(setDropdownValue(name, value)),
    setDatepicker: (name, value) => dispatch(setDatepickerDate(name, value)),
    sortOrFilrterTasks: (state) =>
      dispatch((dispatch) => sortOrFilrterTasks(dispatch, state)),
    resetSearchData: () => dispatch(resetSearchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
