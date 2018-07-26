import { MyAppAngularPage } from './app.po';

describe('my-app-angular App', () => {
  let page: MyAppAngularPage;

  beforeEach(() => {
    page = new MyAppAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
