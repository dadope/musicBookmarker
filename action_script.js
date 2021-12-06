const _yt_music_domain = "https://music.youtube.com/";
const _youtube_domain = "https://www.youtube.com/";

let _bookmarks_tree = chrome.bookmarks.getTree();

chrome.action.onClicked.addListener(function (tab) {
    let current_tab_url = tab.url;
    let current_tab_title = tab.title;

    if (tab.url.indexOf(_yt_music_domain) !== -1 || tab.url.indexOf(_youtube_domain) !== -1) {
        let video_id = current_tab_url.split("v=")[1];
        let ampersandPosition = video_id.indexOf('&');

        if(ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }

        let url_to_save = _yt_music_domain + "watch?v=" + video_id;

        chrome.bookmarks.create({
            'parentId': _bookmarks_tree.id,
            'title':current_tab_title,
            'url':url_to_save
        });
    } else {
        console.log("Extension used on not supported domain!");
    }
});