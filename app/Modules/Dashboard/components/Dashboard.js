import React, {Component} from 'react'

import MnemonicAndHdPath from 'Elements/MnemonicAndHdPath'
import AccountList from './AccountList'

import WithEmptyState from 'Elements/WithEmptyState'
import Spinner from 'Elements/Spinner'
import Icon from 'Elements/Icon'
import HeaderBar from 'Elements/HeaderBar'

import Styles from './Dashboard.css'

class LoadingAccounts extends Component {
  render () {
    return (
      <Spinner width={40} height={40}/>
    )
  }
}

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addAccountBtnDisabled: false
    }
  }

  componentDidMount () {
    this.props.appGetBlockChainState()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.testRpcState.accounts.length === this.props.testRpcState.accounts.length + 1 && this.state.addAccountBtnDisabled) {
      this.setState({addAccountBtnDisabled: false})
    }
  }

  nextAccountIndex = () => {
    return this.props.testRpcState.accounts.length + 1
  }

  _handleAddAccount = () => {
    this.setState({addAccountBtnDisabled: true})
    this.props.appAddAccount({index: this.nextAccountIndex()})
  }

  _handleClearLogs = () => {
    this.props.appClearLogs()
  }

  render () {
    return (
      <div className={Styles.Accounts}>
        <HeaderBar>
          <Icon name="account" size={32} />
          <h4>ACCOUNTS</h4>
        </HeaderBar>
        <main>
          <WithEmptyState
            test={this.props.testRpcState.accounts.length === 0}
            emptyStateComponent={LoadingAccounts}
            >
            <AccountList accounts={this.props.testRpcState.accounts} />
          </WithEmptyState>
          <div className={Styles.Mnemonic}>
            <MnemonicAndHdPath
              mnemonic={this.props.testRpcState.mnemonic}
              hdPath={this.props.testRpcState.hdPath}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default Dashboard
