import React from 'react';
import ReactDOM from 'react-dom';
import ReactMedia from 'react-media';

import 'core-js';

import './less/main.less';

const lang = {
  app: {
    name: 'User List',
    footertext: (
      <i>Botdiril Version 300<br />Designed by Tefek</i>
    ),
    usericonalt: 'Profile picture'
  },
  func: {
    sortby: 'Seřadit podle: ',
    search: {
      placeholder: 'Type to search...'
    }
  },
  item: {
    coin: 'Coindiril',
    kek: 'Kek',
    kektoken: 'VKek',
    megakek: 'Mega Kek',
    key: 'Key',
    dust: 'Arcane Dust',
    cards: 'Cards'
  },
  linkNames: {
    test1: 'Tefek\'s Homepage',
    test2: 'Botdiril on Github',
    test3: 'Join Vandiland Now!',
    test4: 'About'
  }
};

const config = {
  logo: require('./img/botdiril.png'),
  logomobile: require('./img/botdiril-m.png'),
  icons: {
    coin: require('./img/coindiril.png'),
    kek: require('./img/kek.png'),
    kektoken: require('./img/kektoken.png'),
    megakek: require('./img/megakek.gif'),
    key: require('./img/key.png'),
    dust: require('./img/dust.png'),
    cards: require('./img/cards.png')
  }
};

const footerLinks = [ {
  key: 'tefekcz',
  name: lang.linkNames.test1,
  link: 'https://tefek.cz'
}, {
  key: 'githubbotdiril',
  name: lang.linkNames.test2,
  link: 'https://github.com/493msi/botdiril'
}, {
  key: 'vandilandinvite',
  name: lang.linkNames.test3,
  link: 'https://discord.gg/Vandiril'
}, {
  key: 'aboutpage',
  name: lang.linkNames.test4,
  link: 'about.html'
} ];

class UserListApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render () {
    return (
      <div>
        <header id='topHeader'>
          <ReactMedia query='(min-width: 600px)'>
            {(matches) => {
              if (matches) {
                return <img className='logoImg' src={config.logo} alt='Botdiril Logo' />;
              } else {
                return <img className='logoImg' src={config.logomobile} alt='Botdiril Logo' />;
              }
            }}
          </ReactMedia>
          <div id='headerName'>
            {lang.app.name}
          </div>
          <div id='headerTools'>
            <input id='userSearch' type='text' placeholder={lang.func.search.placeholder} />
          </div>
        </header>
        <div className='cardSet'>
          <UserCardList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <input
              id='new-todo'
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add user #{this.state.items.length + 1}
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleChange (e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      coins: Math.random() * 500,
      dust: Math.random() * 500,
      keks: Math.random() * 500,
      megakeks: Math.random() * 500,
      tokens: Math.random() * 500,
      keys: Math.random() * 500,
      cards: Math.random() * 500,
      profilepic: 'https://cdn.discordapp.com/emojis/470190849867907073.png?v=1'
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class UserCardList extends React.Component {
  render () {
    return (
      this.props.items.map(item => (
        <div className='card' key={item.id}>
          <UserIcon url={item.profilepic} />
          <div className='cardRPart'>
            <div className='nameHeader'>{item.text}</div>
            <div className='idDesc'>{item.id}</div>
          </div>
          <div className='currencyDisplay'>
            <span className='cardCurrency' id='cardCoins'>
              <ItemIcon source={config.icons.coin} name={lang.item.coin} />
              {item.coins}
            </span>
            <span className='cardCurrency' id='cardDust'>
              <ItemIcon source={config.icons.dust} name={lang.item.dust} />
              {item.dust}
            </span>
            <span className='cardCurrency' id='cardKeks'>
              <ItemIcon source={config.icons.kek} name={lang.item.kek} />
              {item.keks}
            </span>
            <span className='cardCurrency' id='cardMegaKeks'>
              <ItemIcon source={config.icons.megakek} name={lang.item.megakek} />
              {item.megakeks}
            </span>
            <span className='cardCurrency' id='cardTokens'>
              <ItemIcon source={config.icons.kektoken} name={lang.item.kektoken} />
              {item.tokens}
            </span>
            <span className='cardCurrency' id='cardKeys'>
              <ItemIcon source={config.icons.key} name={lang.item.key} />
              {item.keys}
            </span>
            <span className='cardCurrency' id='cardCards'>
              <ItemIcon source={config.icons.cards} name={lang.item.cards} />
              {item.cards}
            </span>
          </div>
        </div>
      ))
    );
  }
}

class Footer extends React.Component {
  render () {
    return (
      <div>
        <span className='footerText'>{lang.app.footertext}</span>
        <ul>
          {footerLinks.map(item => (
            <li key={item.key}><a className='footerLink' href={item.link}>{item.name}</a></li>
          ))}
        </ul>
      </div>
    );
  }
}

class ItemIcon extends React.Component {
  render () {
    return (
      <img src={this.props.source} alt={this.props.name} title={this.props.name} className='currencyIcon' />
    );
  }
}

class UserIcon extends React.Component {
  render () {
    return (
      <img src={this.props.url} alt={lang.app.usericonalt} title={lang.app.usericonalt} className='userIcon' />
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<UserListApp />, document.getElementById('appContainer'));
  ReactDOM.render(<Footer />, document.getElementById('appFooter'));
});
