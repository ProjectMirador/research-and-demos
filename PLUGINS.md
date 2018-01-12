# Mirador Plugin Ecosystem
Mirador has served as a flexible component in many different projects, in support of which it has accumulated features. To more flexibly support unexpected uses, Mirador 3 has been designed with an explicit plugin system in mind. In fact, many of Mirador's core features are themselves implemented as plugins.

There are three layers of features provided to Mirador installers and developers. The first layer is the core. This provides the programmer with a state management model, with comparison features and basic IIIF Presentation API viewing enabled by default. The second layer of "core plugins" extends these functions with many of the same features offered in Mirador 2, implemented as plugins, such as the annotation and image manipulation tools, search service, and manifest picker. The third layer of plugins are those authored by the community. To facilitate these features, the native plugin system in Mirador has been documented and made available to anyone who needs to extend Mirador's functionality using the same patterns used to implement the core plugins. [This table outlines the anticipated plugin layers in Mirador 3](PLUGIN-LAYERS.md).

## Core
Mirador core provides all the necessary architecture to write plugins. It also provides a state management solution and an event system, and can even be run headlessly. By default, it also provides basic windowing and comparison with IIIF Presentation API viewing.

## Core Plugins

## Community Plugins
