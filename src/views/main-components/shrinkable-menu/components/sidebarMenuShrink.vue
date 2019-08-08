<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
          <!-- v-if="item.children.length !== 1" -->
        <Dropdown
          transfer
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <template v-if="child.children">
                <Dropdown :key="'sub'+i" placement="right-start">
                  <DropdownItem :key="i">
                    <Icon :type="child.icon"></Icon>
                    <span style="padding-left:10px;">{{child.title}}</span>
                    <Icon type="ios-arrow-forward"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list">
                    <template v-for="(child_son,j) in child.children">
                      <DropdownItem :key="'child'+j">
                        <Icon :type="child_son.icon"></Icon>
                        <span style="padding-left:10px;">{{child_son.title}}</span>
                      </DropdownItem>
                    </template>
                  </DropdownMenu>
                </Dropdown>
              </template>
              <template v-else>
                <DropdownItem :name="child.name" :key="i">
                  <Icon :type="child.icon"></Icon>
                  <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                </DropdownItem>
              </template>
            </template>
          </DropdownMenu>
        </Dropdown>
        <!-- <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
          <Button
            @click="changeMenu(item.children[0].name)"
            style="width: 70px;margin-left: -5px;padding:10px 0;"
            type="text"
          >
            <Icon :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.children[0].name" :key="'d' + index">
              <Icon :type="item.children[0].icon || item.icon"></Icon>
              <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarMenuShrink",
  props: {
    menuList: {
      type: Array
    },
    iconColor: {
      type: String,
      default: "white"
    },
    menuTheme: {
      type: String,
      default: "darck"
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit("on-change", active);
    },
    itemTitle(item) {
      if (typeof item.title === "object") {
        return item.title;
      } else {
        return item.title;
      }
    }
  }
};
</script>
