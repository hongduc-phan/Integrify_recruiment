import React, {Component} from 'react'
import SortDownIcon from 'react-icons/lib/md/arrow-downward';
import SortUpIcon from 'react-icons/lib/md/arrow-upward';
import EditIcon from 'react-icons/lib/md/edit';
import DeleteIcon from 'react-icons/lib/md/delete';

import {
  Header,
  Button,
  Input,
  Table,
  TableColumn,
  TableRow,
  TableHead,
} from './components';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    const jsonString = localStorage.getItem('participants');
    const participants = jsonString ? JSON.parse(jsonString) : [];
    const sortDefault = participants.reduce((final, currentValue) => {
      final.push(currentValue.uid);
      return final;
    }, []);

    this.state = {
      isEditing: null,
      addParticipantFormDisable: true,
      addParticipantErrors: {},
      addParticipantValues: {
        name: '',
        email: '',
        tel: '',
      },
      editParticipantFormDisable: true,
      editParticipantValues: {
        name: '',
        email: '',
        tel: '',
      },
      editParticipantErrors: {
        name: false,
        email: false,
        tel: false,
      },
      sorted: sortDefault,
      sortedField: null,
      sortedFieldDirection: null,
      participants,
    }
  }

  setEditParticipant = (uid) => {
    return () => {
      const data = this.state.participants[this.state.participants.findIndex((participant) => {
        return participant.uid === uid;
      })];
      this.setState({
        isEditing: uid,
        editParticipantFormDisable: true,
        editParticipantValues: {
          name: data.name,
          email: data.email,
          tel: data.tel,
        },
        editParticipantErrors: {
          name: false,
          email: false,
          tel: false,
        },
      })
    }
  };

  deleteParticipant = (uid) => {
    return () => {
      const index = this.state.participants.findIndex((participant) => {
        return participant.uid === uid;
      });
      let newData = this.state.participants.slice(0, index).concat(this.state.participants.slice(index + 1));
      this.setState({
        participants: newData,
        sorted: this.state.sorted.slice().filter((item) => {
          return item !== uid;
        })
      }, () => {
        this.syncToStore();
      })
    }
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: null,
    })
  };

  submitEditParticipant = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newData = this.state.participants.concat();
    const index = this.state.participants.findIndex((participant) => {
      return participant.uid === this.state.isEditing;
    });
    newData[index] = {
      uid: this.state.participants[index].uid,
      name: data.get('name'),
      email: data.get('email'),
      tel: data.get('tel'),
    };
    this.setState({
      participants: newData,
      isEditing: null,
    }, () => {
      this.syncToStore();
      if(this.state.sortedField && this.state.sortedFieldDirection !== 'none') {
        this.sortParticipants(this.state.sortedField, this.state.sortedFieldDirection)();
      }
    })
  };

  checkEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  submitAddParticipant = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newUid = new Date().getTime();
    let sortedFieldDirection = this.state.sortedFieldDirection;
    const newParticipants = this.state.participants.concat([{
      uid: newUid,
      name: data.get('name'),
      email: data.get('email'),
      tel: data.get('tel'),
    }]);

    let newSorted = this.state.sorted.slice(0);

    if(this.state.sortedFieldDirection === 'none' || this.state.sortedFieldDirection === null) {
      newSorted.push(newUid);
    } else {
      const result = this.getSortedData(this.state.sortedField, newParticipants, this.state.sortedFieldDirection);
      newSorted = result.sorted;
      sortedFieldDirection = result.sortedFieldDirection;
    }

    this.setState({
      addParticipantFormDisable: true,
      addParticipantErrors: {},
      addParticipantValues: {
        name: '',
        email: '',
        tel: '',
      },
      participants: newParticipants,
      sorted: newSorted,
      sortedFieldDirection,
    }, () => {
      this.syncToStore();
    })
  };

  onChangeAddParticipantField = (field) => {
    return (e) => {

      const newState = {
        addParticipantValues: {
          ...this.state.addParticipantValues,
          [field]: e.target.value
        }
      };

      if (!e.target.value) {
        newState.addParticipantErrors = {
          ...this.state.addParticipantErrors,
          [field]: 'Field required',
        }
      } else if (field === 'email' && !this.checkEmail(e.target.value)) {
        newState.addParticipantErrors = {
          ...this.state.addParticipantErrors,
          [field]: 'Need to be a valid email',
        };
      } else {
        newState.addParticipantErrors = {
          ...this.state.addParticipantErrors,
          [field]: false,
        };
      }

      if (Object.keys(newState.addParticipantErrors).length === 3) {
        let error = false;

        Object.keys(newState.addParticipantErrors).forEach((key) => {
          if (newState.addParticipantErrors[key] !== false) {
            error = true;
          }
        });

        newState.addParticipantFormDisable = error;
      } else {
        newState.addParticipantFormDisable = true;
      }

      this.setState(newState);
    }
  };

  onChangeEditParticipantField = (field) => {
    return (e) => {
      const newState = {
        editParticipantValues: {
          ...this.state.editParticipantValues,
          [field]: e.target.value
        }
      };

      if (!e.target.value) {
        newState.editParticipantErrors = {
          ...this.state.editParticipantErrors,
          [field]: 'Field required',
        }
      } else if (field === 'email' && !this.checkEmail(e.target.value)) {
        newState.editParticipantErrors = {
          ...this.state.editParticipantErrors,
          [field]: 'Need to be a valid email',
        };
      } else {
        newState.editParticipantErrors = {
          ...this.state.editParticipantErrors,
          [field]: false,
        };
      }

      if (Object.keys(newState.editParticipantErrors).length === 3) {
        let error = false;

        Object.keys(newState.editParticipantErrors).forEach((key) => {
          if (newState.editParticipantErrors[key] !== false) {
            error = true;
          }
        });

        newState.editParticipantFormDisable = error;
      } else {
        newState.editParticipantFormDisable = true;
      }

      this.setState(newState);
    }
  };

  syncToStore = () => {
    window.localStorage.setItem('participants', JSON.stringify(this.state.participants))
  };

  sortParticipants = (field, direction) => {
    return () => {
      const result = this.getSortedData(field, this.state.participants, direction);
      this.setState({
        sortedField: field,
        ...result,
      });
    }
  };

  getSortedData = (field, participants, direction) => {
    let sortedFieldDirection = direction || this.state.sortedFieldDirection;
    const sortedField = this.state.sortedField;

    if(!direction) {
      if(sortedField !== field) {
        sortedFieldDirection = 'down';
      } else {
        if (!sortedFieldDirection || sortedFieldDirection === 'none') {
          sortedFieldDirection = 'down';
        } else if (sortedFieldDirection === 'down') {
          sortedFieldDirection = 'up';
        } else if (sortedFieldDirection === 'up') {
          sortedFieldDirection = 'none';
        }
      }
    }

    let sorted;

    if(sortedFieldDirection === 'none') {
      sorted = participants.slice(0).reduce((final, currentValue) => {
        final.push(currentValue.uid);
        return final;
      }, []);
    } else {
      const cloneData = participants.slice(0);
      sorted = cloneData.sort((a, b) => {
        if(sortedFieldDirection === 'down') {
          if (a[field].toLowerCase() < b[field].toLowerCase())
            return -1;
          if (a[field].toLowerCase() > b[field].toLowerCase())
            return 1;
        }
        if(sortedFieldDirection === 'up') {
          if (a[field].toLowerCase() < b[field].toLowerCase())
            return 1;
          if (a[field].toLowerCase() > b[field].toLowerCase())
            return -1;
        }
        return 0;
      }).reduce((final, currentValue) => {
        final.push(currentValue.uid);
        return final;
      }, []);
    }

    return {
      sortedFieldDirection,
      sorted,
    }
  };

  renderRowParticipant = (participant) => (
    <TableRow
      key={participant.uid}
    >
      <TableColumn>
        {participant.name}
      </TableColumn>
      <TableColumn>{participant.email}</TableColumn>
      <TableColumn>{participant.tel}</TableColumn>
      <TableColumn>
        <div className="table-participants__actions">
          <span>
            <EditIcon onClick={this.setEditParticipant(participant.uid)}/>
          </span>
          <span>
            <DeleteIcon onClick={this.deleteParticipant(participant.uid)}/>
          </span>
        </div>
      </TableColumn>
    </TableRow>
  );

  renderRowEditingParticipant = (participant) => (
    <TableRow
      key={participant.uid}
    >
      <TableColumn>
        <Input
          error={this.state.editParticipantErrors.name || ''}
          onChange={this.onChangeEditParticipantField('name')}
          value={this.state.editParticipantValues.name}
          name="name"
          form="form-edit"
          type="text"
          placeholder="Full name"
        />
      </TableColumn>
      <TableColumn>
        <Input
          error={this.state.editParticipantErrors.email || ''}
          onChange={this.onChangeEditParticipantField('email')}
          value={this.state.editParticipantValues.email}
          name="email"
          form="form-edit"
          type="email"
          placeholder="Email"
        />
      </TableColumn>
      <TableColumn>
        <Input
          error={this.state.editParticipantErrors.tel || ''}
          onChange={this.onChangeEditParticipantField('tel')}
          value={this.state.editParticipantValues.tel}
          name="tel"
          form="form-edit"
          type="text"
          placeholder="Phone number"
        />
      </TableColumn>
      <TableColumn>
        <div className="table-participants__actions">
          <Button onClick={this.handleCancelEdit}>Cancel</Button>
          <Button type="submit" form="form-edit" primary disabled={this.state.editParticipantFormDisable}>Save</Button>
        </div>
      </TableColumn>
    </TableRow>
  );

  renderSortIcon = (field) => {
    if(field === this.state.sortedField) {
      switch (this.state.sortedFieldDirection) {
        case 'up':
          return (<span><SortUpIcon/></span>);
        case 'down':
          return (<span><SortDownIcon/></span>)
      }
    }
  };

  render() {
    return (
      <div>
        <Header/>
        <form method="get" id="form-edit" onSubmit={this.submitEditParticipant}/>
        <div className="view-range content">
          <h1 className="page-title">List of participants</h1>
          <form className="form" onSubmit={this.submitAddParticipant}>
            <div className="row form__content">
              <div className="col col-1">
                <Input
                  error={this.state.addParticipantErrors.name || ''}
                  onChange={this.onChangeAddParticipantField('name')}
                  name="name"
                  value={this.state.addParticipantValues.name}
                  type="text"
                  placeholder="Full name"
                />
              </div>

              <div className="col col-2">
                <Input
                  error={this.state.addParticipantErrors.email || ''}
                  onChange={this.onChangeAddParticipantField('email')}
                  value={this.state.addParticipantValues.email}
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </div>

              <div className="col col-1">
                <Input
                  error={this.state.addParticipantErrors.tel || ''}
                  onChange={this.onChangeAddParticipantField('tel')}
                  value={this.state.addParticipantValues.tel}
                  name="tel"
                  type="text"
                  placeholder="Phone number"
                />
              </div>
              <div className="col col-2">
                <div className="form__submit">
                  <Button primary disabled={this.state.addParticipantFormDisable}>Add new</Button>
                </div>
              </div>
            </div>
          </form>
          <Table
            className="table-participants"
          >
            <tbody>
            <TableRow>
              <TableHead
                onClick={this.sortParticipants('name')}
              >
                Name {this.renderSortIcon('name')}
              </TableHead>
              <TableHead
                onClick={this.sortParticipants('email')}
              >
                Email address {this.renderSortIcon('email')}
              </TableHead>
              <TableHead
                onClick={this.sortParticipants('tel')}
              >
                Phone number {this.renderSortIcon('tel')}
              </TableHead>
              <TableHead/>
            </TableRow>
            {
              this.state.sorted.map((uid) => {
                const participant = this.state.participants.find((p) => {
                  return p.uid === uid;
                });
                if (participant.uid === this.state.isEditing) {
                  return this.renderRowEditingParticipant(participant)
                }
                return this.renderRowParticipant(participant)
              })
            }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
