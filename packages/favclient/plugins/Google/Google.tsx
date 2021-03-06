import * as React from 'react';
import FavPlugIn from '../FavPlugIn';

let styles = require('favclient/favclient.scss');

interface GoogleState {
    search: string;
}

class Google extends React.Component<any, GoogleState> {
    private googleInput: HTMLInputElement;

    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <div className={styles.tableDiv}>
                <div className={styles.trDiv}>
                    <div className={styles.tdDiv + styles.googleLogo}>
                        <a href="https://www.google.com/">
                            <img src="/resource/google.png" width="80" />
                        </a>
                    </div>
                    <div className={styles.tdDiv}>
                        <input
                            type="text"
                            ref={ref => (this.googleInput = ref)}
                            value={this.state.search}
                            className={styles.tableInput}
                            onInput={this.updateSearch}
                            onKeyPress={this.onKeyPress}
                        />
                    </div>
                    <div className={styles.tdDiv}>
                        <button className={styles.modalDialogButton} onClick={this.doSearch}>
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private updateSearch = () => {
        this.setState({
            search: this.googleInput.value,
        });
    };

    private onKeyPress = (ev: React.KeyboardEvent<EventTarget>) => {
        if (ev.which == 13) {
            this.doSearch();
        }
    };

    private doSearch = () => {
        let search = this.state.search;

        if (search) {
            this.setState({
                search: '',
            });
            window.location.href = 'https://www.google.com/#newwindow=1&q=' + encodeURI(search);
        }
    };
}

function getPlugin(): FavPlugIn {
    return {
        pluginId: '{A9618D02-EEB8-4EDE-AE23-C25943419F69}',
        displayName: 'Google',
        getBody: () => <Google />,
        logoUrl: 'resource/google.png',
        url: 'https://www.google.com/',
    };
}

export { getPlugin };
