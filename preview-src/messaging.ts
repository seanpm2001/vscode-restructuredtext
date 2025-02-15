/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {getSettings} from './settings';

export interface MessagePoster {
    /**
     * Post a message to the rst extension
     */
    postMessage(type: string, body: object): void;

    /**
     * Post a command to be executed to the rst extension
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postCommand(command: string, args: any[]): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPosterForVsCode = (vscode: any) => {
    return new (class implements MessagePoster {
        postMessage(type: string, body: object): void {
            vscode.postMessage({
                type,
                source: getSettings().source,
                body,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        postCommand(command: string, args: any[]) {
            this.postMessage('command', {command, args});
        }
    })();
};
