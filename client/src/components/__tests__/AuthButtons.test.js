import React from 'react';
import { mount } from 'enzyme';
import AuthButtons from '../AuthButtons';

describe('<AuthButtons />', () => {
  test('should show logout button if loggedInUser is passed in provider', () => {
    // const user = { id: '123', username: 'nitin' };
    // const wrapper = mount(<Navbar {...requiredProps} loggedInUser={user} />);
    // expect(wrapper.find('button').length).toBe(1);
    // expect(wrapper.find('button').text()).toBe('Logout');
  });

  test('should show auth buttons user is null', () => {
    //   const wrapper = mount(<Navbar {...requiredProps} />);
    //   const buttons = wrapper.find('button');
    //   expect(buttons.length).toBe(2);
    //   expect(
    //     buttons
    //       .at(0)
    //       .text()
    //       .toLowerCase(),
    //   ).toContain('signup');
    //   expect(
    //     buttons
    //       .at(1)
    //       .text()
    //       .toLowerCase(),
    //   ).toContain('login');
    // });
  });

  test('should show <SignupModal /> form after clicking signup button', () => {
    const wrapper = mount(<AuthButtons />);
    const buttons = wrapper.find('button');
    const signupBtn = buttons.at(0);
    expect(wrapper.find('SignupModal').length).toBe(1);
    expect(wrapper.find('SignupModal').props().show).toBe(false);
    signupBtn.simulate('click');
    expect(wrapper.find('SignupModal').props().show).toBe(true);
  });

  test('should show <LoginModal /> form after clicking login button', () => {
    const wrapper = mount(<AuthButtons />);
    const buttons = wrapper.find('button');
    const loginbtn = buttons.at(1);
    expect(wrapper.find('LoginModal').length).toBe(1);
    expect(wrapper.find('LoginModal').props().show).toBe(false);
    loginbtn.simulate('click');
    expect(wrapper.find('LoginModal').props().show).toBe(true);
  });
});
