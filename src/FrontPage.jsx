import React from 'react';
import styles from './index.css';

class FrontPage extends React.Component
{
  // TODO -- isn't there a better way to do this?!
  componentWillMount()
  {
    this.fetchAllServerStatusInitialState();
  }

  componentDidMount()
  {
    this.fetchAllServerStatusInitialState();
  }

  constructor(props)
  {
    super(props);

    this.state = {
      statusServer23: "UNKNOWN",
      statusServer21: "UNKNOWN",
      statusServer24: "UNKNOWN",
      statusServer27: "UNKNOWN",
      statusServer28: "UNKNOWN",
      statusServer145: "UNKNOWN"
    }

    this.fetchServerStatusFor = this.fetchServerStatusFor.bind(this);
    this.setServerStatus = this.setServerStatus.bind(this);
    this.fetchAllServerStatusInitialState.bind(this);
  }

  fetchAllServerStatusInitialState()
  {
    this.fetchServerStatusFor("http://www.k21.com");
    this.fetchServerStatusFor("http://www.k23.com");
    this.fetchServerStatusFor("http://www.k24.com");
    this.fetchServerStatusFor("http://www.k27.com");
    this.fetchServerStatusFor("http://www.k28.com");
    this.fetchServerStatusFor("http://www.k145.com");
  }

  fetchServerStatusFor(ipAddress)
  {
    let that = this;

    var maintHeader = "ALIVE";

    fetch(ipAddress + "/maint-stat").then(function(response)
    {
        return response;
    })
    .then(data => {
      maintHeader = data.status;

      that.setServerStatus(ipAddress, maintHeader);
    });
  }

  setServerStatus(ipAddress, maintHeader)
  {
    let stat = "LIVE";

    if (maintHeader === 503)
    {
      stat = "UNDER MAINTENANCE";
    }
    else if (typeof maintHeader === "undefined")
    {
      stat = "MAINTENANCE STATUS UNKNOWN";
    }

    if (ipAddress.includes("k23"))
    {
      this.setState({statusServer23: stat});
    }
    else if (ipAddress.includes("k21"))
    {
      this.setState({statusServer21: stat});
    }
    else if (ipAddress.includes("k24"))
    {
      this.setState({statusServer24: stat});
    }
    else if (ipAddress.includes("k27"))
    {
      this.setState({statusServer27: stat});
    }
    else if (ipAddress.includes("k28"))
    {
      this.setState({statusServer28: stat});
    }
    else if (ipAddress.includes("k145"))
    {
      this.setState({statusServer145: stat});
    }
  }

  render()
  {
    if (this.state.statusServer21 === "UNKNOWN" ||
        this.state.statusServer23 === "UNKNOWN" ||
        this.state.statusServer24 === "UNKNOWN" ||
        this.state.statusServer27 === "UNKNOWN" ||
        this.state.statusServer28 === "UNKNOWN" ||
        this.state.statusServer145 === "UNKNOWN")
    {
      return (
        <div className = "wrapper">
        <h1 id = "bigheader">Loading, please wait!</h1>
        </div>
      );
    }
    else
    {

    return (
      <div className = "wrapper">
        <h1 id = "bigheader">Click Click BOOM</h1>
        <ServersComponent
          {...this.state}
          fetchServerStatusFor={(ipAddress) => this.fetchServerStatusFor(ipAddress)}
        />
      </div>
    );
  }
  }
}

class ServersComponent extends React.Component
{
  constructor(props)
  {
    super(props);

    this.setupStatus = this.setupStatus.bind(this);
    this.killNode = this.killNode.bind(this);
    this.reviveNode = this.reviveNode.bind(this);
    this.makeWebCall = this.makeWebCall.bind(this);
  }

  killNode(nodeToKill)
  {
    this.makeWebCall(nodeToKill + "/kill");
    this.props.fetchServerStatusFor(nodeToKill);
  }

  reviveNode(nodeToRevive)
  {
    this.makeWebCall(nodeToRevive + "/revive");
    this.props.fetchServerStatusFor(nodeToRevive);
  }

  makeWebCall(ipAddress)
  {
    fetch(ipAddress).then(function(response)
    {
        return response;
    });
  }

  setupStatus()
  {
    return (
      <div className="servers">
          <p>Server 23: <span id="serverStatus">{this.props.statusServer23}</span> ||| <button className = "btnkill" name = "kill23" value = "Kill 23" onClick={() => this.killNode("http://www.k23.com")}>Kill</button>   <button className = "btnrev" name = "revive23" value = "Revive 23" onClick = {() => this.reviveNode("http://www.k23.com")}>Revive</button></p>
          <hr />
          <p>Server 21: <span id="serverStatus">{this.props.statusServer21}</span> ||| <button className = "btnkill" name = "kill21" value = "Kill 21" onClick={() => this.killNode("http://www.k21.com")}>Kill</button>   <button className = "btnrev" name = "revive21" value = "Revive 21" onClick = {() => this.reviveNode("http://www.k21.com")}>Revive</button></p>
          <hr />
          <p>Server 24: <span id="serverStatus">{this.props.statusServer24}</span> ||| <button className = "btnkill" name = "kill24" value = "Kill 24" onClick={() => this.killNode("http://www.k24.com")}>Kill</button>   <button className = "btnrev" name = "revive24" value = "Revive 24" onClick = {() => this.reviveNode("http://www.k24.com")}>Revive</button></p>
          <hr />
          <p>Server 27: <span id="serverStatus">{this.props.statusServer27}</span> ||| <button className = "btnkill" name = "kill27" value = "Kill 27" onClick={() => this.killNode("http://www.k27.com")}>Kill</button>   <button className = "btnrev" name = "revive27" value = "Revive 27" onClick = {() => this.reviveNode("http://www.k27.com")}>Revive</button></p>
          <hr />
          <p>Server 28: <span id="serverStatus">{this.props.statusServer28}</span> ||| <button className = "btnkill" name = "kill28" value = "Kill 28" onClick={() => this.killNode("http://www.k28.com")}>Kill</button>   <button className = "btnrev" name = "revive28" value = "Revive 28" onClick = {() => this.reviveNode("http://www.k28.com")}>Revive</button></p>
          <hr />
          <p>Server 145: <span id="serverStatus">{this.props.statusServer145}</span> ||| <button className = "btnkill" name = "kill145" value = "Kill 145" onClick={() => this.killNode("http://www.k145.com")}>Kill</button>   <button className = "btnrev" name = "revive145" value = "Revive 145" onClick = {() => this.reviveNode("http://www.k145.com")}>Revive</button></p>
      </div>
    );
  }

  render()
  {
    let serverStatuses = this.setupStatus();

    return(
      <div className = "wrapper">
        <div className = "serversDiv">
        {serverStatuses}
        </div>
        <p>
          Use the kill button next to each row to kill that Varnish server and put it under maintenance.
          Use the revive button to end maintenance and bring that server live again.
        </p>
        <p>
          Be aware that if you restart Varnish, the killSig is reset and traffic will flow again. So you
          will need to issue to killSig again if you would like to continue maintenance.
          There is no way around this technical limitation. Note that, due to the way Netscaler handles
          traffic, it may take a couple extra seconds for Varnish to see traffic again after restart.
        </p>
        <p>
          Netscaler usually picks up a revived node in less than 5 seconds but it can take around 10 seconds
          for Netscaler to stop sending traffic to a node, since requests do need to complete. If by 10 seconds
          a node hasn't been revived or stopped by 15s, there is a potential Netscaler or Varnish problem.

          <br />
          <br />

          Click Click BOOM does NOT stop you from causing a full-scale outage by killing all the prod
          nodes. It's like Linux -- you're expected to know what you're doing. ;)
        </p>

      </div>
    );
  }
}

export default FrontPage;
