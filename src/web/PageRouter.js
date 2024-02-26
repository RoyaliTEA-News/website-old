import fs from 'fs';
import ejs from 'ejs';
import { JSDOM } from 'jsdom';
import jQuery from 'jquery';
import * as radiocontroller from '../api/radios/radio.controller';
const notfound = {
    page: '404',
    data: 'Page not found'
};

export default {
    getPage: async (pagename, data) => {
        pagename = pagename == '/' ? 'home' : pagename;
        pagename = pagename.startsWith('/') ? pagename : `/${pagename}`;
        let path = `${__dirname}/pages${pagename.toLowerCase()}.ejs`;
        // Checks
        if (pagename.match(/\/radios\/.{3,16}/gi)) {
            path = `${__dirname}/templates/radio.ejs`;
            const id = pagename.split('/radios/')[1];
            try {
                data = {
                    ...data,
                    station: await radiocontroller.fetchStats(id)
                };
            } catch {
                return notfound;
            };
        };
        if (pagename == '/radios') {
            data = { ...data, radios: await radiocontroller.listRadios() };
        };
        if (fs.existsSync(path)) {
            try {
                data = data || {};
                let html = ejs.render(fs.readFileSync(path, 'utf8'), data).split('\n');
                const { window } = new JSDOM(html.join('\n'));
                const $ = jQuery(window);
                const page = $('title').text();
                $('title').remove();
                html = $('content').html();
                return {
                    page,
                    data: html
                };
            } catch {

            };
        } else {
            return notfound;
        };
    }
};