"use strict"
const React = require("react");
const Nav = require("../module/nav");


class Personal extends React.Component {
    render() {
        return <div className="f-page personal">
                    <div className="w-categories">
                        <Nav/>
                    </div>

                </div>;
    }
}
module.exports = Personal;