# Recent Cards plugin for NodeBB's Persona Theme

This is an addon for the Persona theme which adds a recent cards component to the header of the homepage. It's inspired by the previous default theme, Lavender, which used Modern UI styling for the category layout.


## Installation

Install via one-click activation in the Admin Control Panel or run the following command:

    npm i nodebb-plugin-recent-cards

## Screenshot

![](http://i.imgur.com/V993A2v.png)

# Standalone installation for external websites (Advanced)

Use this plugin on any external non-nodebb site (ex. Wordpress, etc) to show recent topics from your NodeBB install.

### Header Scripts + Styles

Place these in the `header` section of your external site, and replace all instances of `{forumURL}` to your forum's URL:

```
<script src="{forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/jquery.bxslider.min.js"></script>
<script>
window.path_to_nodebb = '{forumURL}';
</script>
<script src="{forumURL}/plugins/nodebb-plugin-recent-cards/static/lib/external.js"></script>
<link rel="stylesheet" type="text/css" href="{forumURL}/plugins/nodebb-plugin-recent-cards/render/style.css" />
<link rel="stylesheet" type="text/css" href="{forumURL}/plugins/nodebb-plugin-recent-cards/static/bxslider/jquery.bxslider.css" />
```

If your external site doesn't have jQuery included, you will have include it above the previous lines. Get the latest jQuery at https://code.jquery.com/

You should also (optionally) require the jQuery Timeago library in order to display human-readable timestamps:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.6.1/jquery.timeago.min.js"></script>
```

If your external site doesn't have Bootstrap included, you will have to include this line as well in your `header`, which is the bare minimum (grid + responsive utilities) required for this plugin:

```
<link rel="stylesheet" type="text/css" href="{forumURL}/plugins/nodebb-plugin-recent-cards/static/external/bootstrap-grid.css" />
```

Similarly, if your external site does not use FontAwesome, then you will have to include this line as well in order to display category icons:

```
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
```


Finally, if you need to include the default Persona font to match your external site's recent cards with your forum's, then include this:

```
<link rel="prefetch stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
```


### Body Content

Place the following code wherever you'd like recent cards to be displayed:

```
<div id="nodebb-plugin-recent-cards"></div>
```

### Stuck?

No problem! Visit https://yourforum.com/admin/plugins/nodebb-plugin-recent-cards/tests/external, which will render the standalone version of the plugin tailored for your website. Keep in mind that this includes all extra scripts and styling that you may not necessarily need if you already have Bootstrap, jQuery, etc. on your external site.
