<h1 align="center"><strong>Spline Generator</strong></h1>

<div align="center">
  <a href="https://npmjs.org/package/nls-spline-generator">
    <img src="https://badgen.now.sh/npm/v/nls-spline-generator" alt="version" />
  </a>
</div>

---

# Getting started

## 1) Add dependency to your project

```bash
# npm
npm install nls-spline-generator --save

# yarn
yarn add nls-spline-generator
```

## 2) Import module to your Angular application

```ts
// app.module.ts (default filename)

import { NlsSplineGeneratoreModule } from 'nls-spline-generator';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    NlsSplineGeneratoreModule
  ],
  providers: [
    // ...
  ],
  bootstrap: [
    // ...
  ]
})
export class AppModule { }
```

## 4) Implement directive in your template

Past in the configuration and set animation to `true` or `false` (default is `false`):

```html
<nls-spline-generator [config]="config"></nls-spline-generator>
```

## Usage only

```ts
// models/config.model.ts
/**
 * The Configuration stands for incoming parameters from outside
 * to adjust the outcoming graphs.
 */

export interface Config {
  /**
   * Amount of orientation points, excl. entry and vector points
   */
  points?: number;
  /**
   * Points distributation factor depending on canvas size
   */
  overshoot?: number;
  /**
   * Amount of graphs
   */
  graphs?: number;
  /**
   * Amount of splines each graph
   */
  splines?: number;
  /**
   * Directional vectors coming next after entry points.
   * Starting as well ending points of graph drawn on canvs.
   * Enters the canvas (in)
   * Leaves the canvas (off)
   */
  vector?: {
    in?: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Margin between canvas border and first graph curve (px)
       */
      tension: number;
    },
    out?: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Margin between canvas border and first graph curve (px)
       */
      tension: number;
    }
  };
  /**
   * Configuration for Margins for Entrie Points, Splines and the Canvas at all.
   */
  margin?: {
    /**
     *  Margin between entry points of graphs
     */
    entry?: number;
    /**
     * Margin between splines of graphs
     */
    spline?: number;
    canvas?: {
      /**
       * Horizontal margin between entry points and canvas boundries (px)
       */
      x?: number;
      /**
       * Vertical margin between entry points and canvas boundries (px)
       */
      y?: number;
    }
  };
   /**
    * Configuration of spline strokes
    */
  stroke?: {
    /**
     * Spline stroke width in pixel
     */
    width: number;
    /**
     * Spline stroke color in hexadecimal, rgb, etc.
     */
    colors: string[];
  };
  /**
   * Configuration for Animation
   */
  animation?: {
    enabled?: boolean;
    /**
     * Animation frames per second, default 60
     */
    fps?: number;
    frequency?: number;
    /**
     * Amplitude of noise generated animation pathes
     */
    amplitude?: number;
    /**
     * Radius of circular noise generated pathes
     */
   radius?: number;
    /**
     * Ticks per one animation cycle
     */
    ticks?: number;
  };
  /**
   * Enable debug mode to draw all helpers like
   * points etc.
   */
  debug?: boolean;
}
```


## Active Development (Advanced)

### Rquirements

- Node.js
- Angular CLI

### NPM Scripts

| command          | description                                                        |
|------------------|--------------------------------------------------------------------|
| `npm run start`  | start development server on `http://localhost:4200/`               |
| `npm run build`  | build production application and save to `./dist`                  |
| `npm run build:library` | build node module and save to `./dist/nls-spline-generator` | 
| `npm run library:files` | copy `README.md` and `LICENSE` to library directory         | 

### Version Release

#### 1. Bumping new version of main application

```bash
npm version major|minor|patch -m "RELEASE MESSAGE" 
```

#### 2. Synchronizing versions

Synchronize the version of `./projects/nls-spline-generator/package.json` with the main application `./package.json`. 

#### 3. Copying files

Copy `README.md` and `LICENSE` from main application to library.

```bash
npm run library:files
```

#### 4. Building library

```bash
npm run build:library
```

#### 5. Publishing to npm

```bash
cd dist/nls-guilloche
npm publish
cd ../..
```

#### 6. Push changes to repository

```bash
git push
git push --tags
```

### Semantic Versioning

**Any release or tag must use [Semantic Versioning](//semver.org/).**

Given a version number `MAJOR.MINOR.PATCH`, increment the:

1. `MAJOR` version when you make incompatible API changes,
1. `MINOR` version when you add functionality in a backwards-compatible manner, and
1. `PATCH` version when you make backwards-compatible bug fixes.

*Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.*


## Contributors

- Author and Realisation [Michael Czechowski](//github.com/nextlevelshit)
- Consultant [Martin Maga](//github.com/qualiacode)
- Idea and Concept [Bernhard Kinzler](//b612-design.de)

## License

> pending
