/* eslint-env jest */
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = function (ctx) {
  it('should revalidate content properly from /', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/en-US.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/`);
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('en-US');
    expect(JSON.parse($('#router-query').text())).toEqual({});

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('en-US');
    expect(JSON.parse($('#router-query').text())).toEqual({});
  });

  it('should revalidate content properly from /fr', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/fr.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/fr`);
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('fr');
    expect(JSON.parse($('#router-query').text())).toEqual({});

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/fr`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('fr');
    expect(JSON.parse($('#router-query').text())).toEqual({});
  });

  it('should revalidate content properly from /nl-NL', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/nl-NL.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/nl-NL`);
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(JSON.parse($('#router-query').text())).toEqual({});

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/nl-NL`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(JSON.parse($('#router-query').text())).toEqual({});
  });

  it('should revalidate content properly from /gsp/fallback/first', async () => {
    // check the _next/data URL first
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/en-US/gsp/fallback/first.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/gsp/fallback/first`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('en-US');
    expect(props.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/gsp/fallback/first`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('en-US');
    expect(props2.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });
  });

  it('should revalidate content properly from /fr/gsp/fallback/first', async () => {
    // check the _next/data URL first
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/fr/gsp/fallback/first.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/fr/gsp/fallback/first`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('fr');
    expect(props.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/fr/gsp/fallback/first`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('fr');
    expect(props2.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });
  });

  it('should revalidate content properly from /nl-NL/gsp/fallback/first', async () => {
    // check the _next/data URL first
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/nl-NL/gsp/fallback/first.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/nl-NL/gsp/fallback/first`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/nl-NL/gsp/fallback/first`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props2.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });
  });
  //

  it('should revalidate content properly from /gsp/fallback/new-page', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/en-US/gsp/fallback/new-page.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    const initRes = await fetch(`${ctx.deploymentUrl}/gsp/fallback/new-page`);
    expect(initRes.status).toBe(200);

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/gsp/fallback/new-page`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('en-US');
    expect(props.params).toEqual({ slug: 'new-page' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'new-page' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/gsp/fallback/new-page`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('en-US');
    expect(props2.params).toEqual({ slug: 'new-page' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'new-page' });
  });

  it('should revalidate content properly from /fr/gsp/fallback/new-page', async () => {
    // we have to hit the _next/data URL first
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/fr/gsp/fallback/new-page.json`
    );
    expect(dataRes.status).toBe(200);

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/fr/gsp/fallback/new-page`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('fr');
    expect(props.params).toEqual({ slug: 'new-page' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'new-page' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/fr/gsp/fallback/new-page`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('fr');
  });

  it('should revalidate content properly from /nl-NL/gsp/fallback/new-page', async () => {
    // we have to hit the _next/data URL first
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/nl-NL/gsp/fallback/new-page.json`
    );
    expect(dataRes.status).toBe(200);

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/nl-NL/gsp/fallback/new-page`);
    expect(res.status).toBe(200);

    const html = await res.text();
    let $ = cheerio.load(html);
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props.params).toEqual({ slug: 'new-page' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'new-page' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(
      `${ctx.deploymentUrl}/nl-NL/gsp/fallback/new-page`
    );
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props2.params).toEqual({ slug: 'new-page' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'new-page' });
  });

  it('should revalidate content properly from /gsp/no-fallback/first', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/en-US/gsp/no-fallback/first.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/gsp/no-fallback/first`);
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('en-US');
    expect(props.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/gsp/no-fallback/first`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('en-US');
    expect(props2.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });
  });

  it('should revalidate content properly from /fr/gsp/no-fallback/first', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/fr/gsp/no-fallback/first.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(`${ctx.deploymentUrl}/fr/gsp/no-fallback/first`);
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('fr');
    expect(props.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(`${ctx.deploymentUrl}/fr/gsp/no-fallback/first`);
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('fr');
    expect(props2.params).toEqual({ slug: 'first' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'first' });
  });

  it('should revalidate content properly from /nl-NL/gsp/no-fallback/second', async () => {
    const dataRes = await fetch(
      `${ctx.deploymentUrl}/_next/data/testing-build-id/nl-NL/gsp/no-fallback/second.json`
    );
    expect(dataRes.status).toBe(200);
    await dataRes.json();

    await new Promise(resolve => setTimeout(resolve, 4000));

    const res = await fetch(
      `${ctx.deploymentUrl}/nl-NL/gsp/no-fallback/second`
    );
    expect(res.status).toBe(200);

    let $ = cheerio.load(await res.text());
    const props = JSON.parse($('#props').text());
    const initialRandom = props.random;
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props.params).toEqual({ slug: 'second' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'second' });

    // wait for revalidation to occur
    await new Promise(resolve => setTimeout(resolve, 4000));

    const res2 = await fetch(
      `${ctx.deploymentUrl}/nl-NL/gsp/no-fallback/second`
    );
    expect(res2.status).toBe(200);

    $ = cheerio.load(await res2.text());
    const props2 = JSON.parse($('#props').text());
    expect(initialRandom).not.toBe(props2.random);
    expect($('#router-locale').text()).toBe('nl-NL');
    expect(props2.params).toEqual({ slug: 'second' });
    expect(JSON.parse($('#router-query').text())).toEqual({ slug: 'second' });
  });
};
