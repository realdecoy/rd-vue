import { StoryComponent, StoryProp, Vue } from '.storybook/modules';

@StoryComponent({
  name: '__COMPONENT__KEBAB__',
  description: '__COMPONENT__ component.',
  import: '@/components/__COMPONENT__KEBAB__',
  components: {},
})
class __COMPONENT__ extends Vue {
  // --------------------------------------------------------------------------
  // Fields
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Props
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  // --------------------------------------------------------------------------
  // Accessors
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Event Handlers
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Lifecycle Hooks
  // --------------------------------------------------------------------------
  public mounted() {
    // TODO: stuff to do when this component loads.
  }
}

export {
  __COMPONENT__ as default,
  __COMPONENT__,
};
