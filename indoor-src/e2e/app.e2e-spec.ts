import { IndoorSrcPage } from './app.po';

describe('indoor-src App', () => {
  let page: IndoorSrcPage;

  beforeEach(() => {
    page = new IndoorSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
