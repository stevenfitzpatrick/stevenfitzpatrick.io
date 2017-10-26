import { h } from 'preact';
import { fetchBookmarks } from 'components/favourites/sagas';
import { getBookmarks } from 'clients/api';
import { call, put } from 'redux-saga/effects';

describe('Bookmarks sagas fetch data correctly', () => {
  let interator;
  beforeEach(() => {
    interator = fetchBookmarks();
  });

  it('should call the correct effect saga methods for bookmarks', () => {
    expect(interator.next().value).to.deep.equal(
      call(getBookmarks, {})
    );

    // Fake Response
    const bookmarks = [];
    const tags = {};

    expect(interator.next(bookmarks, tags).value).to.deep.equal(
      put({
        type: 'BOOKMARKS_FETCH_SUCCEEDED',
        payload: { bookmarks, tags }
      })
    );

    // Expect to be done
    expect(interator.next()).to.deep.equal({
      done: true,
      value: undefined
    });
  });
});
