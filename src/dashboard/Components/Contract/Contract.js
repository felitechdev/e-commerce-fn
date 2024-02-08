import { Button, Image, Layout, Space, Table, Typography, Input, Tag } from "antd";
import { Chart } from "../Chart/Chart";
import type { TableProps } from 'antd/es/table';
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import { useState } from "react";
import ContractModel from "./ContractModel/ContractModel";
import { ActionButton } from "./ActionButton/ActionButton";
  
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

const { Title, Paragraph, Text } = Typography;

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const Contract = () => {

    const [searchText, setSearchText] = useState();
    const [searchedColumn, setSearchedColumn] = useState();
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
          searchedColumn === dataIndex ? <span style={{ fontWeight: 'bold' }}>{text}</span> : text,
      });
    
      const searchInput = (
        <Input
          placeholder="Search table"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginBottom: 8 }}
        />
      );

    const category = [
        {name: "Orders",value: 1024,},
        {name: "Earning",value: 1024,},
        {name: "Customers",value: 1024,},
        {name: "Total Earning",value: 1024,},  
    ];
    
    const data= [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: '1',
          name: `Mike ${i}`,
          age: 32,
          address: `10 Downing Street ${i}`,
        });
      }

    const numberOfCards = 5;

    const onDownload = () => {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => {
            const url = URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.png';
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            link.remove();
          });
      };

    const Columns = [
        {
          title: 'Company',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <Space size={12}>
                <Image
                    width={50}
                    className="rounded-md"
                    src={src}
                    preview={{
                        toolbarRender: (
                        _,
                        {
                            transform: { scale },
                            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                        },
                        ) => (
                        <Space size={12} className="mx-w-full h-screen">
                            <DownloadOutlined onClick={onDownload} />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        </Space>
                        ),
                    }}
                />
                <div>
                    <Title level={5} className="w-full">{record.name}</Title>
                    <Text className="w-full">Dresses</Text>
                </div>
            </Space>
          ),
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Category 1',
              value: 'Category 1',
              children: [
                {
                  text: 'Yellow',
                  value: 'Yellow',
                },
                {
                  text: 'Pink',
                  value: 'Pink',
                },
              ],
            },
            {
              text: 'Category 2',
              value: 'Category 2',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Black',
                  value: 'Black',
                },
              ],
            },
          ],
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value: string, record) => record.name.includes(value),
          width: 200,
        },
        {
          title: 'Contract name',
          dataIndex: 'contract',
          key: 'contract',
          width: 100,
          sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
            width: 100,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Join date',
            dataIndex: 'Join date',
            key: 'Join date',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a, b) => a.age - b.age,
            render: (_,record) => (
            <div className="w-full text-center">
                <Tag className="rounded-full bg-blue-700 text-white px-4 py-1">Pending</Tag>
            </div>
            ),
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          key: 'Action',
          width: 100,
          render: (_, record) => (<ActionButton />),
        },
      ];

      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    return(
    <Layout className="space-y-6 bg-white">
        <Space className="flex justify-between">
            <Title level={3}>Contract</Title>
            <ContractModel />
        </Space>
        <div className="">
        {searchInput}
            <Table
            rowClassName="even:bg-[#f1f5f9] hover:cursor-pointer"
            rowSelection={{
                type: "checkbox",
                onChange: (
                // Changes to be applied
                ) => {
                // setSelectedRows(selectedRows);
                },
                getCheckboxProps: (record) => ({
                disabled: false, // Column configuration not to be checked
                }),
            }}
            size="small"
            tableLayout="fixed"
            bordered={true}
            style={{
                position: "sticky",
                bottom: 0,
                top: 0,
                left: 0,
                zIndex: 1,
            }}
            dataSource={data}
            // columns={Columns.map((col) => ({ ...col, ...getColumnSearchProps(col.dataIndex) }))}
            columns={Columns}
            onChange={onChange}
            scroll={{ x: 1500, y: 1200 }}
            />
        </div>
        
    </Layout>
    );
}