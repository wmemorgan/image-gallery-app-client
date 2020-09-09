import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { EventEmitter } from "./utils/events";

import Login from "./components/AuthComponents/Login";
import Signup from "./components/AuthComponents/Signup";
import ProtectedRoute from "./components/AuthComponents/ProtectedRoute";
import UserList from "./components/UserComponents/UserList";
import User from "./components/UserComponents/User";
import ImageSearch from "./components/ImageComponents/ImageSearch";

/**
 * Define all application routes
 */
class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null,
			userList: [],
			errorMessage: "",
			id: null,
			username: "",
			firstname: "",
			lastname: "",
			primaryemail: "",
			roles: "",
		};
		EventEmitter.subscribe("getData", (event) => this.getDataHandler(event));
		EventEmitter.subscribe("getUser", (event) => this.getUser(event));
		//EventEmitter.subscribe("verifyAdmin", (event) => this.verifyAdmin(event));
	}

	/**
	 * Retrieve all users from API
	 */
	getData = async () => {
		try {
			const endpoint = "/users/users";
			const data = await axios.get(endpoint);
			console.log(`GETDATA: `, data);
			this.setState(
				{
					status: data.status,
					userList: data.data,
				},
				() => console.log(this.state.status)
			);
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error_description,
			});
		}
	};

	getDataHandler = () => {
		const token = localStorage.getItem("token");
		console.log(`Is there a token: `, token);
		if (token) {
			this.getData();
		}
	};

	getUser = async () => {
		try {
			const endpoint = `/users/user/profile`;

			const data = await axios.get(endpoint);
			console.log(`GET USER DATA `, data);
			// Populate locale state
			const {
				username,
				firstname,
				lastname,
				primaryemail,
				roles,
				images,
				userid,
			} = data.data;

			this.setState(
				{
					id: userid,
					username,
					firstname,
					lastname,
					primaryemail,
					roles,
					images,
				},
				() => this.verifyAdmin()
			);
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error,
			});
		}
	};

	verifyAdmin = () => {
		console.log(`this.state.roles, `, this.state.roles);
		if (
			this.state.roles.length > 0 &&
			this.state.roles.find((role) => role.role.name.toUpperCase() === "ADMIN")
		) {
			localStorage.setItem("isAdmin", true);
			EventEmitter.dispatch("getData");
		}

		EventEmitter.dispatch("updateMenu");
	};

	componentDidMount() {
		console.log(`CDM: `, this.state.userList);
		if (this.state.userList.length === 0) {
			this.getDataHandler();
		}
	}

	render() {
		return (
			<>
				<Route
					exact
					path="/"
					render={() =>
						localStorage.getItem("token") ? (
							<Redirect
								to={{ pathname: "/imagesearch", state: { ...this.state } }}
							/>
						) : (
							<Redirect to="/login" />
						)
					}
				/>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<ProtectedRoute path="/imagesearch" component={ImageSearch} />
				<ProtectedRoute path="/profile" component={User} />
				<ProtectedRoute
					exact
					path="/users"
					render={(props) => <UserList {...props} {...this.state} />}
				/>
				{this.state.userList.map((user) => (
					<Route
						key={user.userid}
						path={`/users/${user.userid}`}
						render={(props) => <User {...props} {...this.state} user={user} />}
					/>
				))}
			</>
		);
	}
}

export default withRouter(Routes);

/* Turn off authentication


*/
