import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userData: null };
    }
    loadUserData() {
        this.setState({ userData: null });
        this.fetchID = fetchUserData(
            this.props.username,
            (userData) => {
                this.setState({ userData });
        });
    }

    componentDidMount() {
        this.loadUserData();
    }

    componentWillUnmount() {
        cancelFetch(this.fetchID);
    }
    
    render() {
        const isLoading = this.state.userData === null ? true : false;
        let className = 'Profile';
        if (isLoading) {
            className += ' loading';
            this.name = 'Loading...';
            this.bio = 'Loading...';
            this.friends = [];
        } else {
            this.name = this.state.userData.name;
            this.bio = this.state.userData.bio;
            this.friends = this.state.userData.friends;
        }

        return (
        <div className={className}>
            <div className="profile-picture"></div>
            <div className="profile-body">
                <img src={isLoading ? 'Loading...' : this.state.userData.profilePictureUrl} alt="" />
                <h2>{this.name}</h2>
                <h3>@{this.props.username}</h3>
                <p>{this.bio}</p>
                <h3>{this.friends}</h3>
                <Userlist usernames={[]} onChoose={this.props.onChoose} />
            </div>
        </div>
        );
    }
}