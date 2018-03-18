import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!localStorage.getItem('participants')) {
  window.localStorage.setItem('participants', JSON.stringify(
    [
      {
        uid: ('1521374378500'),
        name: ('DaveGreat'),
        email: ('dave@gmail.com'),
        tel: ('123456789'),
      },
      {
        uid: ('1521374378501'),
        name: ('DavuidMoore'),
        email: ('davuidmoore@gmail.com'),
        tel: ('987654321'),
      },
      {
        uid: ('1521374378502'),
        name: ('MichelRues'),
        email: ('michelRues@gmail.com'),
        tel: ('987655321'),
      },
      {
        uid: ('1521374378503'),
        name: ('DavuidBeckham'),
        email: ('davuidbeckham@gmail.com'),
        tel: ('987634321'),
      },
      {
        uid: ('1521374378504'),
        name: ('CrisRonaldo'),
        email: ('cronaldo@gmail.com'),
        tel: ('987154321'),
      },
      {
        uid: ('1521374378505'),
        name: ('TonyAllen'),
        email: ('toniallen@gmail.com'),
        tel: ('987254321'),
      },
      {
        uid: ('1521374378506'),
        name: ('ToniKross'),
        email: ('tonikross@gmail.com'),
        tel: ('987657329'),
      },
      {
        uid: ('1521374378507'),
        name: ('ManuerNueul'),
        email: ('manueul@gmail.com'),
        tel: ('987354328'),
      },
      {
        uid: ('1521374378508'),
        name: ('DiegoForlan'),
        email: ('diegoforlan@gmail.com'),
        tel: ('187654327'),
      },
      {
        uid: ('1521374378509'),
        name: ('FrankLampard'),
        email: ('franklampard@gmail.com'),
        tel: ('287654326'),
      },
      {
        uid: ('1521374378510'),
        name: ('JoBeoteang'),
        email: ('jobeoteang@gmail.com'),
        tel: ('387654325'),
      },
      {
        uid: ('1521374378511'),
        name: ('MarkHummels'),
        email: ('markhummels@gmail.com'),
        tel: ('487654323'),
      },
      {
        uid: ('1521374378512'),
        name: ('PhillipLahm'),
        email: ('philliplahm@gmail.com'),
        tel: ('587654321'),
      },
      {
        uid: ('1521374378513'),
        name: ('OliverKahn'),
        email: ('oliverkahn@gmail.com'),
        tel: ('687654321'),
      },
      {
        uid: ('1521374378514'),
        name: ('ArienRobben'),
        email: ('arienrobben@gmail.com'),
        tel: ('787654321'),
      },
      {
        uid: ('1521374378515'),
        name: ('FrankRiberry'),
        email: ('frankriberry@gmail.com'),
        tel: ('887654321'),
      },
      {
        uid: ('1521374378516'),
        name: ('AcantaThiego'),
        email: ('acantathiego@gmail.com'),
        tel: ('917654321'),
      },
      {
        uid: ('1521374378517'),
        name: ('DavuidAlaba'),
        email: ('davuidalaba@gmail.com'),
        tel: ('927654321'),
      },
      {
        uid: ('1521374378518'),
        name: ('JamesRogrerez'),
        email: ('jamesrogrerez@gmail.com'),
        tel: ('937654321'),
      },
      {
        uid: ('1521374378519'),
        name: ('MarioGotze'),
        email: ('mariogotze@gmail.com'),
        tel: ('947654321'),
      },
    ]
  ))
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
