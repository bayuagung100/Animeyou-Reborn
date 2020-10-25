import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    
    return (
        <div className="appmain-sidebar">
            <div className="fp">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fanimeyou.net%2F&tabs&width=400&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1978326952425638" 
                width="400" height="214" style={{border: "none", overflow:"hidden"}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div className="copyright">
                © 2020, Animeyou. all rights reserved
            </div>
        </div>
    );
  }
}

export default Sidebar;
