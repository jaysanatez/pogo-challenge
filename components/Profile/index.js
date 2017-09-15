import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UpdateXPModal from '../Modals/UpdateXPModal'
import AddCatchModal from '../Modals/AddCatchModal'

import UserXPTable from './UserXPTable'
import UserCatchTable from './UserCatchTable'
import ProfileHeader from './ProfileHeader'

export default class Profile extends Component {
  render() {
    const {
      trainer,
      message,
      catches,
      onXPUpdate,
      onCatchCreate,
      setStatus,
    } = this.props

    if (!trainer) {
      return null
    }

    var flash = message ?
      (<div className="alert alert-danger mt-3" role="alert">
        { message }
      </div>) :
      null

    var ownCatches = catches.filter(c => {
      return c.userId == trainer._id
    })

    return (
      <div className="mt-3">
        { flash }
        <ProfileHeader trainer={trainer}/>
        <UserXPTable updates={trainer.xpUpdates}/>
        <UserCatchTable catches={catches}/>

        <UpdateXPModal
          onXPUpdate={onXPUpdate}
          setStatus={setStatus}
        />
        <AddCatchModal
          onCatchCreate={onCatchCreate}
          setStatus={setStatus}
        />
      </div>
    )
  }
}

Profile.propTypes = {
  trainer: PropTypes.object,
  catches: PropTypes.array.isRequired,
  onXPUpdate: PropTypes.func.isRequired,
  onCatchCreate: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}
