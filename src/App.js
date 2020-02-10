import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    const url = "https://rt.ex7.pl/get-data";
    fetch(url, {
      method: "POST"
    })
      .then(res => res.json())
      .then(items => {
        console.log(items);
        this.setState({ items: items });
      });
  }
  render() {
    const columns = [
      {
        Header: "ID Produktu",
        accessor: "id",
        sortable: true
      },
      {
        Header: "Skrót",
        accessor: "acronym",
        sortable: true,
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().startsWith(filter.value),
        filterable: true
      },
      {
        Header: "Nazwa Produktu",
        accessor: "name",
        filterable: true,
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().startsWith(filter.value),
        width: 800
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.items}
        defaultPageSize={5}
      ></ReactTable>
    );
  }
}

export default App;
