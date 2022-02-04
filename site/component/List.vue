<template>
  <div class="space">
    <z-list>
      <z-list-item>
        <z-icon>
          <audio-file />
        </z-icon>
        <z-list-item-text> AudioFile </z-list-item-text>
      </z-list-item>
      <z-divider></z-divider>
      <z-list-item>
        <z-icon>
          <audio-file />
        </z-icon>
        <z-list-item-text right> AudioFile </z-list-item-text>
      </z-list-item>
    </z-list>
  </div>
  <div class="space">
    <z-list>
      <z-list-item button>
        <z-icon>
          <audio-file />
        </z-icon>
        <z-list-item-text> AudioFile </z-list-item-text>
      </z-list-item>
      <z-list-item button>
        <z-icon>
          <collection-files />
        </z-icon>
        <z-list-item-text> CollectionFiles </z-list-item-text>
      </z-list-item>
      <z-divider></z-divider>
      <z-collapse-group accordion>
        <z-collapse key="1" no-padding>
          <template #header="{ expanded, toggleExpand }">
            <z-list-item button @click="toggleExpand">
              <z-icon>
                <audio-file />
              </z-icon>
              <z-list-item-text> AudioFile </z-list-item-text>
              <z-arrow :reverse="expanded"></z-arrow>
            </z-list-item>
          </template>
          <z-list no-padding>
            <z-list-item button>
              <z-icon>
                <audio-file />
              </z-icon>
              <z-list-item-text> AudioFile </z-list-item-text>
            </z-list-item>
            <z-list-item button>
              <z-icon>
                <collection-files />
              </z-icon>
              <z-list-item-text> CollectionFiles </z-list-item-text>
            </z-list-item>
          </z-list>
        </z-collapse>
        <z-collapse key="2" no-padding>
          <template #header="{ expanded, toggleExpand }">
            <z-list-item button @click="toggleExpand">
              <z-icon>
                <audio-file />
              </z-icon>
              <z-list-item-text> AudioFile </z-list-item-text>
              <z-arrow :reverse="expanded"></z-arrow>
            </z-list-item>
          </template>
          <z-list no-padding>
            <z-list-item button>
              <z-icon>
                <audio-file />
              </z-icon>
              <z-list-item-text> AudioFile </z-list-item-text>
            </z-list-item>
            <z-list-item button>
              <z-icon>
                <collection-files />
              </z-icon>
              <z-list-item-text> CollectionFiles </z-list-item-text>
            </z-list-item>
          </z-list>
        </z-collapse>
      </z-collapse-group>
    </z-list>
  </div>
  <div class="space">
    <ZCollapseList accordion>
      <ZCollapseListItem key="1">
        <template #header>
          <z-icon>
            <audio-file />
          </z-icon>
          <z-list-item-text> AudioFile </z-list-item-text>
        </template>
        <z-list no-padding>
          <z-list-item button>
            <z-icon>
              <audio-file />
            </z-icon>
            <z-list-item-text> AudioFile </z-list-item-text>
          </z-list-item>
          <z-list-item button>
            <z-icon>
              <collection-files />
            </z-icon>
            <z-list-item-text> CollectionFiles </z-list-item-text>
          </z-list-item>
        </z-list>
      </ZCollapseListItem>
      <ZCollapseListItem key="2">
        <template #header>
          <z-icon>
            <audio-file />
          </z-icon>
          <z-list-item-text> AudioFile </z-list-item-text>
        </template>
        <z-list no-padding>
          <z-list-item button>
            <z-icon>
              <audio-file />
            </z-icon>
            <z-list-item-text> AudioFile </z-list-item-text>
          </z-list-item>
          <z-list-item button>
            <z-icon>
              <collection-files />
            </z-icon>
            <z-list-item-text> CollectionFiles </z-list-item-text>
          </z-list-item>
        </z-list>
      </ZCollapseListItem>
    </ZCollapseList>
  </div>
</template>

<script setup lang="ts">
import {
  ZIcon,
  ZList,
  ZDivider,
  ZListItem,
  ZListItemText,
  ZCollapse,
  ZCollapseGroup,
  ZArrow,
  ZCollapseList,
  ZCollapseListItem,
} from 'azi'
import { AudioFile, CollectionFiles } from '@icon-park/vue-next'
</script>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  background-color: #e7e7e7;
  padding: 50px;
  margin-bottom: 30px;
}

:deep(.z-list) {
  background-color: #fff;
}
</style>

<style>
.dark .z-list {
  background-color: #4c4a4a;
}
</style>
