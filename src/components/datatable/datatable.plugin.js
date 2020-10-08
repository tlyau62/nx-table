import NxTable from '@/components/datatable/VDatatable';
import NxTableColumn from '@/components/datatable/VDatatableColumn';

const DatatablePlugin = {
    install(Vue) {
        Vue.component("nx-table", NxTable);
        Vue.component("nx-table-column", NxTableColumn);
    }
};

export default DatatablePlugin;